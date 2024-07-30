{pkgs}:
pkgs.stdenv.mkDerivation {
  name = "Server for WebRTC Android";
  src = ./.;
  buildInputs = [pkgs.bun];
  propagatedBuildInputs = [
    pkgs.ffmpeg_7-headless
    pkgs.janus-gateway
  ];
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
