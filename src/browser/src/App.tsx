import { useCallback, useRef, useState } from "react";
import useJanusStream from "./hooks/useJanusStream";


export default function App() {
  const videoPlayer = useRef<any>();
  const onReceivedMediaTrack = useCallback((mediaStreamTrack: MediaStreamTrack) => {
    const newMediaStream = new MediaStream()
    newMediaStream.addTrack(mediaStreamTrack);
    videoPlayer.current.srcObject = newMediaStream;
  }, [])
  useJanusStream(onReceivedMediaTrack, ["ws://127.0.0.1:8188"])

  return (
    <>
      <h1>Janus Server Minimal Example</h1>
      <video
        autoPlay
        playsInline
        controls
        ref={videoPlayer}
      />
    </>
  )
}

