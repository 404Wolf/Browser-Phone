{
  description = "Android in the browser with WebRTC and Nixified Android";

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
        packages = {
          default = pkgs.callPackage ./server.nix {inherit pkgs;};
          build-android-emulator = args:
            import ./src/android/emulator.nix {
              args = builtins.fromJSON args;
              inherit pkgs;
            };
        };
        devShells.default = pkgs.mkShell {
          packages = [
            pkgs.bun
            pkgs.vlc
            pkgs.tcpdump
            pkgs.scrcpy
            pkgs.janus-gateway
            pkgs.ffmpeg_7-full
            pkgs.android-tools
            pkgs.android-studio
          ];
        };
      }
    );
}