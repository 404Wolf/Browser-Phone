{
  description = "Utility to display and control your Android device";

  inputs = {
    flake-utils.url = "github:numtide/flake-utils";
    nixpkgs.url = "github:nixos/nixpkgs/nixos-unstable";
  };

  outputs = {
    self,
    nixpkgs,
    flake-utils,
  }:
    flake-utils.lib.eachDefaultSystem (system: let
      pkgs = import nixpkgs {
        inherit system;
        config = {
          allowUnfree = true;
          android_sdk.accept_license = true;
        };
      };

      pinnedJDK = pkgs.jdk;
      ndkVersion = "25.1.8937393";
      androidComposition = pkgs.androidenv.composeAndroidPackages {
        cmdLineToolsVersion = "8.0";
        toolsVersion = "26.1.1";
        platformToolsVersion = "34.0.4";
        buildToolsVersions = ["34.0.0"];
        platformVersions = ["34"];
        includeSources = true;
        cmakeVersions = ["3.22.1"];
        includeNDK = true;
        ndkVersions = [ndkVersion];
        useGoogleAPIs = false;
        useGoogleTVAddOns = false;
      };
    in {
      packages.default = pkgs.stdenv.mkDerivation {
        src = ./.;
        buildInputs = [
          pkgs.jdk
          androidComposition.androidsdk
        ];
        buildPhase =
          #bash
          ''
            export ANDROID_HOME="${androidComposition.androidsdk}/libexec/android-sdk"
            export SCRCPY_DEBUG=true
            export SERVER_DIR=${./src}
            bash ${./build.sh}
          '';
        installPhase =
          #bash
          ''
            mkdir -p $out
            cp ./build $out
          '';
      };
      devShells.default = pkgs.mkShell rec {
        packages = [
          androidComposition.androidsdk
          pinnedJDK
        ];

        JAVA_HOME = pinnedJDK;
        ANDROID_SDK_ROOT = "${androidComposition.androidsdk}/libexec/android-sdk";
        ANDROID_NDK_ROOT = "${ANDROID_SDK_ROOT}/ndk-bundle";
        shellHook =
          #bash
          ''
            export ANDROID_HOME="${androidComposition.androidsdk}/libexec/android-sdk"
            export SCRCPY_DEBUG=true
            export SERVER_DIR=./src
            export PATH="$PATH:${androidComposition.androidsdk}/build-tools"
          '';
      };
    });
}
