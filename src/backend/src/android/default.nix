{ pkgs, ... }:
pkgs.writeShellScriptBin "emulator" ''
  run_test_emulator=${
    pkgs.androidenv.emulateApp {
      name = "AndroidEmulator";
      abiVersion = "x86_64";
      systemImageType = "google_apis_playstore";
    }
  }/bin/run-test-emulator;
  scrcpy=${pkgs.scrcpy}/bin/scrcpy;
  ${builtins.readFile ./launch.sh}
''
