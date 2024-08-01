{
  description = "Cookiecutter project template collection";

  inputs = {
    flake-utils.url = "github:numtide/flake-utils";
    nixpkgs.url = "github:nixos/nixpkgs/nixos-unstable";
    android-tools.url = "github:tadfisher/android-nixpkgs";
  };

  outputs = {
    self,
    nixpkgs,
    android-tools,
    flake-utils,
  }:
    flake-utils.lib.eachDefaultSystem (system: let
      pkgs = import nixpkgs {
        inherit system;
        config = {
          allowUnfree = true;
          android_sdk.accept_licenses = true;
        };
      };

      android-sdk = android-tools.sdk.${system} (sdkPkgs:
        with sdkPkgs; [
          cmdline-tools-latest
          build-tools-34-0-0
          platform-tools
          platforms-android-34
          emulator
        ]);
    in {
      packages.default = pkgs.stdenv.mkDerivation {
        name = "scrcpy-server";
        src = ./.;
        buildInputs = [];
        buildPhase = ''
        '';
      };
      devShells.default = pkgs.mkShell {
        ANDROID_HOME = "${android-sdk}/share/android-sdk";
        ANDROID_SDK_ROOT = "${android-sdk}/share/android-sdk";
        JAVA_HOME = pkgs.jdk.home;
        packages = [
          pkgs.gradle
          pkgs.meson
          pkgs.jdk
          pkgs.ninja
        ];
        shellHook = ''
          PATH=$PATH:$ANDROID_SDK_ROOT
        '';
      };
    });
}
