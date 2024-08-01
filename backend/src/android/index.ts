import { startEmulator } from "./emulator";
import { startScrcpy } from "./scrcpy";
import { Client } from "adb-ts";

export default async function startAndroid(
  device: string,
  scrcpyServerPath: string,
) {
  const client = new Client({});

  // await startEmulator({
  //   name: "android-emulator",
  //   abiVersion: "x86_64",
  //   systemImageType: "google_apis_playstore",
  //   androidEmulatorFlags: "-no-window",
  // });
  //
  const devices = await client.listDevices();
  if (devices.length === 0) throw new Error("No devices found");
  const deviceId = devices[0].id;
  client.waitBootComplete(deviceId);

  return startScrcpy(device, scrcpyServerPath);
}
