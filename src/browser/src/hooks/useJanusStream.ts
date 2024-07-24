import Janus from "janus-gateway";
import adapter from "webrtc-adapter";
import { useEffect, useRef, useState } from "react";

export default function useJanusStream(
  onReceivedMediaTrack: (mediaTrack: MediaStreamTrack) => void,
  servers: string[],
  checkWebrtcSupport = true,
): MediaStream | undefined {
  useEffect(() => {
    console.debug("Initial callback");

    let streamingPluginHandle: any | null = null;
    Janus.init({
      debug: true,
      dependencies: Janus.useDefaultDependencies({ adapter }),
      callback: () => {
        if (checkWebrtcSupport && !Janus.isWebrtcSupported()) {
          console.debug("No WebRTC support... ");
          return;
        } else {
          console.debug("Creating Janus client");
          const janus = new Janus({
            server: servers,
            apisecret: "secret",
            success: () => {
              console.debug("Janus connected. Requesting streaming plugin.");
              janus.attach({
                plugin: "janus.plugin.streaming",
                iceState: (state) =>
                  console.debug("ICE state changed to " + state),
                mediaState: (mid, on) =>
                  console.debug(
                    "ICE media state for " +
                      mid +
                      " changed to " +
                      (on ? "on" : "off"),
                  ),
                webrtcState: (on) =>
                  console.debug(
                    "WebRTC PeerConnection is " + (on ? "up" : "down") + " now",
                  ),
                onremotetrack: (track: MediaStreamTrack) =>
                  onReceivedMediaTrack(track),
                onmessage: (msg, jsep) => {
                  console.debug("Received msg from Janus server", msg, jsep);
                  if (streamingPluginHandle === null) return;
                  if (jsep === undefined) return;
                  console.debug("Received JSEP!", jsep);
                  console.debug("Answering the JSEP request.");
                  streamingPluginHandle.createAnswer({
                    jsep: jsep,
                    media: { audioSend: false, videoSend: false },
                    success: (jsep: any) => {
                      console.debug("Successful SDP answer created");
                      let body = { request: "start" };
                      streamingPluginHandle.send({ message: body, jsep: jsep });
                    },
                    error: (error: any) => {
                      console.error("WebRTC Error:", error);
                    },
                  });
                },
                success: (receivedStreamingPluginHandle) => {
                  console.debug("Got streaming plugin information");
                  streamingPluginHandle = receivedStreamingPluginHandle;
                  console.debug("Requesting stream from plugin");
                  streamingPluginHandle.send({
                    message: { request: "list" },
                    success: (list: any) => {
                      console.debug("Listed!", list);
                    },
                  });
                  streamingPluginHandle.send({
                    message: { request: "info", id: 1 },
                    success: (info: any) => {
                      console.debug("Got info", info);
                    },
                  });
                  streamingPluginHandle.send({
                    message: { request: "watch", id: 1 },
                    success: (resp: any) => {
                      console.debug("Resp", resp);
                      console.debug(
                        "Watching stream success. Now waiting to start stream.",
                      );
                    },
                  });
                },
              });
            },
          });
        }
      },
    });
  }, []);
}
