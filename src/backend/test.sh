ffmpeg -f h264 -i tcp://localhost:1234 \
    -an \
    -c:v libvpx \
    -b:v 1M \
    -f rtp \
    -sdp_file video.sdp \
    "rtp://localhost:5004/janus"

# ffmpeg -f h264 -i tcp://127.0.0.1:1234 \
#     -an \
#     -c:v libvpx \
#     -b:v 1M \
#     -f rtp \
#     -sdp_file video.sdp \

# ffmpeg -t 7 -f h264 -i tcp://127.0.0.1:1234 -c copy output.mp4
