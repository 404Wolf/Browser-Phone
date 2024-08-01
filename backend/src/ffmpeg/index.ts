import ffmpeg from "fluent-ffmpeg";

export default async function startFfmpeg(
  inputTcpIp: string,
  outputRtpIp: string,
) {
  ffmpeg()
    .input(`tcp://${inputTcpIp}`)
    .noAudio()
    .inputFormat("h264")
    .inputOptions("-re")
    .inputOptions("-probesize", "32")
    .inputOptions("-analyzeduration", "0")
    .videoCodec("copy")
    .outputOptions("-fflags", "nobuffer")
    .outputOptions("-tune", "zerolatency")
    .outputOptions("-flags", "low_delay")
    .output(`rtp://${outputRtpIp}`)
    .format("rtp")
    .outputOptions("-sdp_file", "video.sdp")
    .on("end", () => {
      console.log("Processing finished!");
    })
    .on("error", (err) => {
      console.error(`Error: ${err.message}`);
    })
    .run();
}
