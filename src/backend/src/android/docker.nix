{pkgs}: let
  script = pkgs.callPackage ./script.nix {};
in
  pkgs.dockerTools.buildImage {
    name = "android-emulator";
    tag = "latest";
    config = {
      Cmd = ["${script}/bin/emulator"];
    };
  }
