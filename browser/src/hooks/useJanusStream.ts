import Janus from "janus-gateway";
import adapter from "webrtc-adapter";
import { useEffect} from "react";

export default function useJanusStream(
  onReceivedMediaTrack: (mediaTrack: MediaStreamTrack) => void,
  servers: string[],
  apiSecret: string,
  checkWebrtcSupport = true,
) {
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
            apisecret: apiSecret,
            success: () => {
              console.debug("Janus connected. Requesting streaming plugin.");
              janus.attach({
                plugin: "janus.plugin.streaming",
                onremotetrack: (track, mid, on, metadata) => {
                  Janus.debug(
                    `Remote track (mid=${mid}) ${on ? "added" : "removed"}${metadata ? ` (${metadata.reason}) ` : ""}:`,
                    track,
                  );
                  onReceivedMediaTrack(track);
                },
                onmessage: (msg, jsep) => {
                  Janus.log("Got msg", msg, jsep)
                  if (jsep && jsep.sdp) {
                    Janus.debug("Handling SDP as well...", jsep);
                    let stereo = jsep.sdp.indexOf("stereo=1") !== -1;
                    streamingPluginHandle.createAnswer({
                      jsep: jsep,
                      tracks: [{ type: "data" }],
                      customizeSdp: (jsep: any) => {
                        if (stereo && jsep.sdp.indexOf("stereo=1") == -1) {
                          jsep.sdp = jsep.sdp.replace(
                            "useinbandfec=1",
                            "useinbandfec=1;stereo=1",
                          );
                        }
                      },
                      success: (jsep: any) => {
                        Janus.debug("Got SDP!", jsep);
                        streamingPluginHandle.send({
                          message: { request: "start" },
                          jsep,
                        });
                      },
                      error: (error: any) =>
                        Janus.error("WebRTC error:", error),
                    });
                  }
                },
                success: (receivedStreamingPluginHandle) => {
                  Janus.log(
                    `Plugin attached! (${receivedStreamingPluginHandle.getPlugin()}, id=${receivedStreamingPluginHandle.getId()})`,
                  );
                  streamingPluginHandle = receivedStreamingPluginHandle;
                  streamingPluginHandle.send({
                    message: { request: "list" },
                    success: (list: any) => {
                      Janus.log("Received stream list:", list);
                    },
                  });
                  streamingPluginHandle.send({
                    message: { request: "info", id: 1 },
                    success: (info: any) => {
                      Janus.log("Got stream info:", info);
                    },
                  });
                  streamingPluginHandle.send({
                    message: { request: "watch", id: 1 },
                    success: () => Janus.log("Began watching stream."),
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
