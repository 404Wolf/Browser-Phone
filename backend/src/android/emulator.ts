import { $ } from "bun";

export interface EmulatorConfiguration {
  name: string;
  app?: null;
  platformVersion?: string;
  abiVersion?: string;
  systemImageType?: string;
  enableGPU?: boolean;
  activity?: string;
  androidUserHome?: string;
  avdHomeDir?: string;
  androidAvdHome?: string;
  deviceName?: string;
  sdkExtraArgs?: string;
  androidAvdFlags?: string;
  androidEmulatorFlags?: string;
}

function cleanBuilderOutput(builderOutput: string): string {
  return builderOutput.replace(/\s+/g, "");
}

export async function buildEmulator(config: EmulatorConfiguration) {
  const builder = Bun.spawn([
    "nix-build",
    "./src/android",
    "--no-out-link",
    "--argstr",
    "args",
    JSON.stringify(config),
  ]);
  const result = await new Response(builder.stdout).text();
  console.log("Successfully built android emulator. Path:", result);
  return cleanBuilderOutput(result);
}

export async function cleanupEmulator() {
  return await Promise.all([
    $`adb emu kill`,
    $`pkill qemu`,
    $`pkill adb`,
    $`pkill emulator`,
  ]);
}

export async function startEmulator(config: EmulatorConfiguration) {
  const emulatorPath = await buildEmulator(config);
  console.log("Spawning emulator");
  const process = Bun.spawn([`${emulatorPath}/bin/run-test-emulator`]);
  console.log("Waiting for emulator to spawn", process);
  return process;
}
