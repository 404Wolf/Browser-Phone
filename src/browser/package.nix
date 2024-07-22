{ pkgs }:
pkgs.stdenv.mkDerivation {
  name = "Browser Side for WebRTC Android";
  src = ./.;
  buildInputs = [ pkgs.bun ];
  buildPhase = ''
    bun install
    bun run build
  '';
  installPhase = ''
    mkdir -p $out/bin
    cp -r ./dist/* $out/bin
  '';
  outputHashAlgo = "sha256";
  outputHashMode = "recursive";
  outputHash = "sha256-G2oYzUhhE4U27lWcdFGhAGg3b6izixIGsdhDzqcgu5E=";
}
