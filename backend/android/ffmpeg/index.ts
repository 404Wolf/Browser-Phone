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
    .videoCodec("copy")
    .outputOptions("-fflags", "nobuffer")
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
