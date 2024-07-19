import { useEffect, useState } from "react";

export default () => {
  const [data, setData] = useState<any>(null);
  const [videoStream, setVideoStream] = useState<MediaStream | null>(null);

  useEffect(() => {
    const ws = new WebSocket('ws://localhost:3000');
    navigator.mediaDevices.getUserMedia({ video: true })
      .then((stream) => {
        console.log(JSON.stringify(stream))
      })

    ws.onmessage = (event) => {
      setData(JSON.parse(event.data));
    };
  }, []);


  return (
    <>
      <h1>Websocket</h1>
      <div>
        <pre>{JSON.stringify(data, null, 2)}</pre>
      </div>
    </>
  )
}

