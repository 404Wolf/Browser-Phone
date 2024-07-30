import type { Device as AdbDevice } from "adb-ts";
import { $ } from "bun";

interface ScrcpyOptions {
  tunnel_forward?: boolean;
  audio?: boolean;
  control?: boolean;
  cleanup?: boolean;
  raw_stream?: boolean;
  max_size?: number;
  log_level?: string;
  video_codec?: string;
}

export async function runScrcpy(adbDevice: AdbDevice, options: ScrcpyOptions) {
  const defaults: ScrcpyOptions = {
    tunnel_forward: true,
    audio: false,
    control: false,
    cleanup: false,
    raw_stream: true,
    max_size: 1920,
    log_level: "debug",
  };

  const finalOptions = { ...defaults, ...options };

  const command =
    `CLASSPATH=/data/local/tmp/scrcpy-server-v2.5.jar ` +
    `app_process / com.genymobile.scrcpy.Server 2.5 ` +
    `tunnel_forward=${finalOptions.tunnel_forward} ` +
    `audio=${finalOptions.audio} ` +
    `control=${finalOptions.control} ` +
    `cleanup=${finalOptions.cleanup} ` +
    `raw_stream=${finalOptions.raw_stream} ` +
    `max_size=${finalOptions.max_size} ` +
    `log_level=${finalOptions.log_level}`;

  console.debug("Running scrcpy subprocess on android emulator\n", command);
  return adbDevice.shell(command);
}
