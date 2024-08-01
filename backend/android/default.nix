{
  pkgs,
  android-tools,
  ...
}: let
  run-android-emulator = import ./emulator.nix {inherit pkgs;};
  android-sdk = import ./android-sdk {inherit pkgs android-tools;};
in
  pkgs.dockerTools.buildImage {
    name = "android-emulator";
    tag = "latest";

    copyToRoot = pkgs.buildEnv {
      name = "image-root";
      pathsToLink = ["/bin"];
      paths = [
        pkgs.coreutils
        pkgs.bash
        pkgs.android-sdk
        pkgs.gnugrep
        android-sdk
      ];
    };
    config = {
      Cmd = ["./${run-android-emulator}/bin/android-emulator"];
    };
  }
