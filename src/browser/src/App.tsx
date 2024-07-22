import Janus from "janus-gateway"
import adapter from "webrtc-adapter"
import { useCallback, useEffect, useRef, useState } from "react";


export default () => {
  const [janus, setJanus] = useState<Janus | null>(null)
  const [mediaStream, setMediaStream] = useState<any | null>(null)
  const [streamingPluginHandle, setStreamingPluginHandle] = useState<any | null>(null)

  useEffect(() => {
    console.log("Initial callback")
    Janus.init({
      debug: true,
      dependencies: Janus.useDefaultDependencies({ adapter }),
      callback: (thejanus: any) => {
        console.log('the janus')
        if (!Janus.isWebrtcSupported()) {
          console.log("No WebRTC support... ");
          return;
        }
      }
    });

    console.log("Creating Janus client")
    const janus = new Janus({
      server: ["ws://localhost:8188/janus"],
      apisecret: "secret",
      success: (janusClient: any) => setJanus(janus),
      error: () => setJanus(null),
      destroyed: () => setJanus(null)
    });
  }, [])

  useEffect(() => {
    console.log("Janus client callback")
    if (janus != null) {
      console.log("Janus connected. Running janus callback.")
      janus.attach({
        plugin: "janus.plugin.streaming",
        iceState: function (state) {
          console.log("ICE state changed to " + state);
        },
        mediaState: function (mid, on) {
          console.log("ICE media state for " + mid + " changed to " + (on ? "on" : "off"));
        },
        webrtcState: function (on) {
          console.log("WebRTC PeerConnection is " + (on ? "up" : "down") + " now");
        },
        onremotetrack: (track, mid, added) => {
          console.log("Got remote track!")
          if (track.kind === "video" && added) {
            const stream = new MediaStream([track]);
            setMediaStream(stream)
          }
        },
        onmessage: function (msg, jsep) {
          console.log("Message received", msg, jsep);
          if (jsep !== undefined && jsep !== null) {
            streamingPluginHandle.createAnswer({
              jsep: jsep,
              media: { audioSend: false, videoSend: false },
              success: (jsep: any) => {
                console.log("Successful SDP answer created");
                let body = { request: "start" };
                streamingPluginHandle.send({ message: body, jsep: jsep });
              },
              error: (error: any) => {
                console.error("WebRTC Error:", error);
              }
            });
          }
        },
        success: (plugin) => {
          setStreamingPluginHandle(plugin);
        }
      });
    }
  }, [janus])

  useEffect(() => {
    console.log("Streaming plugin callback")
    if (streamingPluginHandle) {
      console.log("Requesting stream")
      const body = { request: "watch", id: 1 };
      streamingPluginHandle.send({
        message: body,
        success: (mediaStream: any) => {
          console.log("Received stream" + mediaStream);
        },
        error: function (error: any) {
          console.error("Error starting stream:", error);
        }
      });
    }
  }, [streamingPluginHandle])

  return (
    <>
      {mediaStream === null ? "null" : JSON.stringify(mediaStream)}
      <h1>Janus Server Minimal Example</h1>
      {mediaStream !== null && <video
        src={mediaStream.srcObject}
      />}
    </>
  )
}

