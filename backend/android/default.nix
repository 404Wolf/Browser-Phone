{
  pkgs,
  android-tools,
  system,
  ...
}: let
  run-android-emulator = import ./emulator.nix {inherit pkgs;};
  android-sdk = import ./android-sdk.nix {inherit pkgs system android-tools;};
in
  pkgs.dockerTools.buildImage {
    name = "android-emulator";
    tag = "latest";

    copyToRoot = pkgs.buildEnv {
      name = "root";
      pathsToLink = ["/bin"];
      paths = [
        pkgs.jdk
        pkgs.coreutils
        pkgs.bash
        pkgs.busybox
        pkgs.bun
        android-sdk
      ];
    };

    config = {
      Env = [
        "JAVA_HOME=${pkgs.jdk}"
      ];
      Cmd = ["./${run-android-emulator}/bin/android-emulator"];
    };

    extraCommands = ''
      mkdir -p tmp
    '';
  }
