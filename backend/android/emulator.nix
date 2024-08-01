{pkgs, ...}:
pkgs.writeShellScriptBin "android-emulator" ''
  ${pkgs.androidenv.emulateApp {
    name = "android-emulator";
    abiVersion = "x86_64";
    systemImageType = "google_apis_playstore";
    androidEmulatorFlags = "-no-window";
  }}/bin/run-test-emulator & :
  echo "Started android emulator. PID: $!"

  ${builtins.readFile ./scripts/wait-for-boot.sh}
''
