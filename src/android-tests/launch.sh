DOMAIN=localhost:5004/janus
export XDG_RUNTIME_DIR=/run/user/1000

# Start adb server
sudo adb start-server
adb shell screenrecord --output-format=h264 - | ffmpeg \
    -i - \
    -an \
    -c:v libvpx \
    -b:v 1M \
    -f rtp \
    -sdp_file video.sdp \
    "rtp://localhost:5004/janus"

