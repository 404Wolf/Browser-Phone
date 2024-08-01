{pkgs}:
pkgs.stdenv.mkDerivation {
  name = "Server for WebRTC Android";
  src = ./.;
  buildInputs = [pkgs.bun];
  propagatedBuildInputs = [
    pkgs.ffmpeg_7-headless
    pkgs.janus-gateway
    pkgs.bun
  ];
  buildPhase = ''
    bun install
    env PATH="" ${pkgs.bun}/bin/bun run build
  '';
  installPhase = ''
    mkdir -p $out/bin
    cp build/index.js $out/bin/index.js
  '';
  outputHashAlgo = "sha256";
  outputHashMode = "recursive";
  outputHash = "sha256-G2oYzUhhE4U27lWcdFGhAGg3b6izixIGsdhDzqcgu5E=";
}
