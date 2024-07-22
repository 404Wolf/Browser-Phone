import { $ } from "bun";

export default class Android {
  static async buildEmulator() {
    const result = await $`nix build .#android --no-link --json`.text();
    return JSON.parse(result)[0]["outputs"]["out"];
  }

  static async runEmulator() {
    const emulatorPath = await Android.buildEmulator();
    return $`${emulatorPath}/bin/emulator`;
  }
}
