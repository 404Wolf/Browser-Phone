{
  description = "Cookiecutter project template collection";

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
        config = {allowUnfree = true;};
      };
    in {
      packages.default = pkgs.stdenv.mkDerivation {
        name = "scrcpy-server";
        src = ./.;
        buildInputs = [];
        buildPhase = ''
        '';
      };
      devShells.default = pkgs.mkShell {
        ANDROID_SDK_ROOT="${pkgs.android-tools}/bin";
        packages = [pkgs.gradle pkgs.meson pkgs.jdk pkgs.android-studio];
      };
    });
}
