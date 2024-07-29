{pkgs}: let
  buildInputs = with pkgs; [
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
  ];
in
  pkgs.stdenv.mkDerivation {
    name = "Server for WebRTC Android";
    src = ./.;
    buildInputs = [pkgs.bun] ++ buildInputs;
    buildPhase = ''
      bun install
      bun run build
    '';
    installPhase = ''
      ${pkgs.tree}/bin/tree $src
        mkdir -p $out/bin
        cp $src/dist/index.js $out/bin/index.js
    '';
    outputHashAlgo = "sha256";
    outputHashMode = "recursive";
    outputHash = "sha256-G2oYzUhhE4U27lWcdFGhAGg3b6izixIGsdhDzqcgu5E=";
  }
