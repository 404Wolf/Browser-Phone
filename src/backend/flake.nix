{
  description = "Android in the browser with WebRTC and Nixified Android";

  inputs = {
    flake-utils.url = "github:numtide/flake-utils";
    nixpkgs.url = "github:nixos/nixpkgs/nixos-unstable";
  };

  outputs =
    {
      self,
      nixpkgs,
      flake-utils,
    }:
    flake-utils.lib.eachDefaultSystem (
      system:
      let
        pkgs = import nixpkgs {
          inherit system;
          config = {
            allowUnfree = true;
            android_sdk.accept_license = true;
          };
        };
      in
      {
        packages = {
          default = pkgs.callPackage ./src/backend { };
        };
        devShells = {
          browser = pkgs.mkShell { packages = [ pkgs.bun ]; };
          backend = pkgs.mkShell {
            packages = [
              pkgs.bun
              pkgs.janus-gateway
              pkgs.ffpmeg
            ];
          };
        };
      }
    );
}
