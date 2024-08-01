import { startScrcpy } from "./scrcpy";
import { Client } from "adb-ts";

export default async function startAndroid(scrcpyServerPath: string) {
  const client = new Client({});
  const devices = await client.listDevices();
  if (devices.length === 0) throw new Error("No devices found");
  const deviceId = devices[0].id;
  client.waitBootComplete(deviceId);

  return startScrcpy(scrcpyServerPath);
}
