{
  description = "WebRTC media server";

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
    in rec {
      packages.launch-janus = pkgs.writeShellApplication {
        name = "launch-janus";
        runtimeInputs = [pkgs.janus-gateway];
        text = ''
          JANUS_INSTALL=${pkgs.janus-gateway}/lib/janus/plugins
          JANUS_CONFIG_DIR=${./configs}
          JANUS_CONFIG=${./janus.jcfg}
          ${builtins.readFile ./launch.sh}
        '';
      };
      apps.launch-janus = flake-utils.lib.mkApp {
        name = "launch-janus";
        drv = packages.launch-janus;
      };
      devShells.default = pkgs.mkShell {
        packages = [
          pkgs.janus-gateway
          pkgs.ungoogled-chromium
        ];
      };
    });
}
