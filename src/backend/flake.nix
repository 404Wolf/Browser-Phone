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
          android = pkgs.callPackage ./src/android {inherit pkgs;};
          server = pkgs.callPackage ./server.nix {inherit pkgs;};
        };
        devShells.default = pkgs.mkShell {
          packages =
            [
              pkgs.bun
              pkgs.janus-gateway
              pkgs.ffmpeg
            ]
            ++ (with pkgs; [
              glib
              libconfig
              libnice
              jansson
              boringssl
              zlib
              srtp
              libuv
              libmicrohttpd
              curl
              (libwebsockets.overrideAttrs (_: {
                configureFlags = [
                  "-DLWS_MAX_SMP=1"
                  "-DLWS_WITHOUT_EXTENSIONS=0"
                ];
              }))
              sofia_sip
              libogg
              libopus
              usrsctp
              ffmpeg
            ]);
        };
      }
    );
}
