import { startScrcpy } from "./scrcpy";
import { Client } from "adb-ts";

const client = new Client({});
const devices = await client.listDevices();
if (devices.length === 0) throw new Error("No devices found");
const deviceId = devices[0].id;
await client.waitBootComplete(deviceId);

await startScrcpy("./scrcpy.jar");
