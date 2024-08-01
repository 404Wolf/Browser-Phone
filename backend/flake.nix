{
  description = "Android in the browser with WebRTC and Nixified Android";

  inputs = {
    flake-utils.url = "github:numtide/flake-utils";
    nixpkgs.url = "github:nixos/nixpkgs/nixos-unstable";
    android-tools.url = "github:tadfisher/android-nixpkgs";
  };

  outputs = {
    self,
    nixpkgs,
    flake-utils,
    ...
  } @ inputs:
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
          janus = pkgs.callPackage ./janus {inherit pkgs;};
          android = pkgs.callPackage ./android {
            inherit pkgs;
            android-tools = inputs.android-tools;
          };
        };
      }
    );
}
