import { $ } from "bun";

export default class Android {
  static async buildEmulator() {
    return $`cat < nix build --no-link --print-out-paths`
  }

  static async runEmulator() {
    const emulatorPath = await Android.buildEmulator();
    $`${emulatorPath}`
  }
}
