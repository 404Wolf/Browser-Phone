{
  description = "Android streaming with ffmpeg and scrcpy";

  inputs = {
    flake-utils.url = "github:numtide/flake-utils";
    nixpkgs.url = "github:nixos/nixpkgs/cb9a96f23c491c081b38eab96d22fa958043c9fa";
  };

  outputs = {
    self,
    nixpkgs,
    flake-utils,
  }:
    flake-utils.lib.eachDefaultSystem (system: let
      pkgs = import nixpkgs {inherit system;};
    in {
      devShells.default = pkgs.mkShell {
        packages = [
          pkgs.android-tools
          pkgs.ffmpeg
          pkgs.bash
          pkgs.bun
        ];
      };
    });
}
