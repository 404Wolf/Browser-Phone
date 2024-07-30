import { $ } from "bun";

async function getJanusPath(): Promise<string> {
  const fullPath = await $`which janus`.text();
  return fullPath.replace("/bin/janus", "");
}

export async function startJanus(
  configDirPath: string,
  baseConfigPath: string,
  path: string = "janus",
) {
  return Bun.spawn(
    [
      path,
      "-P",
      `${await getJanusPath()}/lib/janus/plugins`,
      "-F",
      configDirPath,
      "-C",
      baseConfigPath,
    ],
    {
      onExit: (proc, exitCode, signalCode, error) =>
        console.log("Janus Exited", proc, exitCode, signalCode, error),
    },
  );
}

export function startFfmpegStream(path = "ffmpeg") {
  return Bun.spawn([
    path,
    "-re",
    "-f",
    "h264",
    "-i",
    "tcp://127.0.0.1:1234",
    "-an",
    "-g",
    "10",
    "-c:v",
    "copy",
    "-f",
    "rtp",
    "-loglevel",
    "verbose",
    "-sdp_file",
    "video.sdp",
    "rtp://127.0.0.1:5004",
  ]);
}
