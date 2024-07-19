{
  description = "Android in the browser with WebRTC and Nixified Android";

  inputs = {
    flake-utils.url = "github:numtide/flake-utils";
    nixpkgs.url = "github:nixos/nixpkgs/nixos-unstable";
    backend.url = "./src/backend";
    browser.url = "./src/browser";
  };

  outputs =
    {
      self,
      nixpkgs,
      flake-utils,
      backend,
      browser,
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
          backend = pkgs.callPackage backend;
          browser = pkgs.callPackage browser;
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
