{
  description = "Example frontend for android in the browser with WebRTC";

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
        pkgs = import nixpkgs { inherit system; };
      in
      {
        packages = {
          default = pkgs.callPackage ./src/backend { };
        };
        devShells.default = pkgs.mkShell { packages = [ pkgs.bun ]; };
      }
    );
}
