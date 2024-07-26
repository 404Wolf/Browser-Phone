{pkgs, ...}:
pkgs.writeShellScriptBin "android-emulator" ''
  ${pkgs.ffmpeg_7-headless}/bin/ffmpeg \
      -i tcp://localhost:1234 \
      -an \
      -c:v libvpx \
      -b:v 1M \
      -f rtp \
      -sdp_file video.sdp \
      "rtp://localhost:5004/janus"
''
