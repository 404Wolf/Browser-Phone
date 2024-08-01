import { useCallback, useRef, useState, useEffect } from "react";
import useJanusStream from "../hooks/useJanusStream";

interface AndroidProps {
  ip: string[];
  apiSecret: string;
}

export default function Android({ ip, apiSecret }: AndroidProps) {
  const videoPlayer = useRef<HTMLVideoElement | null>(null);
  const [mediaStreamTrack, setMediaStreamTrack] = useState<MediaStreamTrack | null>(null);

  const onReceivedMediaTrack = useCallback((track: MediaStreamTrack) => {
    setMediaStreamTrack(track);
  }, []);

  useJanusStream(onReceivedMediaTrack, ip, apiSecret);

  useEffect(() => {
    if (!mediaStreamTrack) return;

    const setupStream = () => {
      if (videoPlayer.current && mediaStreamTrack.readyState === "live") {
        const newMediaStream = new MediaStream();
        newMediaStream.addTrack(mediaStreamTrack);
        videoPlayer.current.srcObject = newMediaStream;
      }
    };

    setupStream();
    const checkStreamHealth = () => {
      if (videoPlayer.current && (!videoPlayer.current.srcObject || mediaStreamTrack.readyState !== "live")) {
        console.log("Stream not healthy, attempting to reconnect...");
        setupStream();
      }
    };

    const intervalId = setInterval(checkStreamHealth, 1000);

    return () => {
      clearInterval(intervalId);
    };
  }, [mediaStreamTrack]);

  return (
    <>
      <h1>Janus Server Minimal Example</h1>
      <video
        autoPlay
        playsInline
        disablePictureInPicture
        ref={videoPlayer}
      />
    </>
  );
}
