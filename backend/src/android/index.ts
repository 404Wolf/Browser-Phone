import { startScrcpy } from "./scrcpy";

export default async function startAndroid(device: string, scrcpyServerPath: string) {
  // await startEmulator(adb, {
  //   name: "android-emulator",
  //   abiVersion: "x86_64",
  //   systemImageType: "google_apis_playstore",
  //   androidEmulatorFlags: "-no-window",
  // }, false);
  // await waitForEmulator(adb);

  return startScrcpy(device,scrcpyServerPath);
}
