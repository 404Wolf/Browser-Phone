{
  description = "Android testing dev shell";

  inputs = {
    flake-utils.url = "github:numtide/flake-utils";
    nixpkgs.url = "github:nixos/nixpkgs/nixos-unstable";
  };

  outputs = {
    self,
    nixpkgs,
    flake-utils,
  }:
    flake-utils.lib.eachDefaultSystem (
      system: let
        pkgs = import nixpkgs {
          inherit system;
          config = {
            allowUnfree = true;
            android_sdk.accept_license = true;
          };
        };
      in {
        packages.default =
          pkgs.writeShellScriptBin "launch.sh"
          # bash
          ''
            ADB=${pkgs.android-tools}/bin/adb
            FFMPEG=${pkgs.ffmpeg}/bin/ffmpeg
            SCRCPY=${pkgs.scrcpy}/bin/scrcpy
            ${builtins.readFile ./launch.sh}
         '';
      }
    );
}
