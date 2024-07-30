import { $ } from "bun";
import { Client as AdbClient, Device as AdbDevice } from "adb-ts";
import { runScrcpy } from "./android/scrcpy";

// startJanus("./src/janus/configs", "./src/janus/janus.jcfg");

async function main(deviceId: string) {
  await $`adb kill-server`.nothrow();
  await $`adb disconnect`.nothrow();
  await Bun.sleep(500);
  const adbClient = new AdbClient({ bin: await $`which adb`.text() });
  console.log("Inited ADB");

  const iDevice = (await adbClient.listDevices()).find(
    (device) => device.id === deviceId,
  );
  if (!iDevice) throw new Error("Device not found.");
  console.log("Device found!", iDevice);
  const device = new AdbDevice(adbClient, iDevice);
  await device.waitBootComplete();
  console.log("Device connected");

  await device.forward("tcp:1234", "localabstract:scrcpyadb");
  console.log("Forwarded port", await device.listForwards());

  device.pushFile(
    "./src/android/scrcpy-server-v2.5.jar",
    "/data/local/tmp/scrcpy-server-v2.5.jar",
  );
  console.log("Pushed scrcpy server to device");

  // await device.putSetting("global", "development_settings_enabled", "1");
  // await device.putSetting("global", "adb_wifi_enabled", "1");
  // console.log("Enabled development settings on emulator");

  await runScrcpy(device, {});
  console.log("Started running scrcpy");

  // await startFfmpegStream();
}

main("R58T33601SF");

// await startEmulator(adb, {
//   name: "android-emulator",
//   abiVersion: "x86_64",
//   systemImageType: "google_apis_playstore",
//   androidEmulatorFlags: "-no-window",
// }, false);
// await waitForEmulator(adb);
