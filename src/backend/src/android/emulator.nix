{pkgs, ...}:
pkgs.writeShellScriptBin "android-emulator" ''
  ${pkgs.androidenv.emulateApp {
    name = "android-emulator";
    abiVersion = "x86_64";
    systemImageType = "google_apis_playstore";
    androidEmulatorFlags = "-no-window";
  }}/bin/run-test-emulator & :
  echo "Started android emulator. PID: $!"

  ADB=${pkgs.android-tools}/bin/adb
  ${builtins.readFile ./scripts/wait-for-boot.sh}

  SCRCPY_SERVER_PATH=${././scrcpy-server-v2.5}
  ${builtins.readFile ./scripts/scrcpy-setup.sh}
''
