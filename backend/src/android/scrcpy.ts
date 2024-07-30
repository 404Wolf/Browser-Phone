import { $ } from "bun";

export async function startScrcpy(deviceId: string, scrcpyServerPath: string) {
  await $`adb push ${scrcpyServerPath} /data/local/tmp/scrcpy-server.jar`;
  console.log("Pushed scrcpy server to device");

  await $`adb forward tcp:1234 localabstract:scrcpy`;
  console.log("Forwarded port");

  await $`adb shell CLASSPATH=/data/local/tmp/scrcpy-server-manual.jar \
    app_process / com.genymobile.scrcpy.Server 2.5 \
    tunnel_forward=true audio=false control=false cleanup=false \
    raw_stream=true max_size=1920`;
  console.log("Started running scrcpy");
}
