# ffmpeg -re -f h264 -i "tcp://127.0.0.1:1234" \
    #     -an \
    #     -preset ultrafast \
    #     -tune zerolatency \
    #     -f rtp \
    #     -loglevel verbose \
    #     -sdp_file video.sdp \
    #     rtp://localhost:5004

# ffmpeg -re -f h264 -i "tcp://127.0.0.1:1234" \
    #     -an \
    #     -c:v copy \
    #     -f rtp \
    #     -loglevel verbose \
    #     -sdp_file video.sdp \
    #     rtp://localhost:5004

ffmpeg -i "tcp://127.0.0.1:1234" \
    -an \
    -c:v copy \
    -f rtp \
    -loglevel verbose \
    -sdp_file video.sdp \
    rtp://localhost:5004
# ffmpeg -re -f h264 -i "tcp://127.0.0.1:1234" \
    #     -an \
    #     -preset ultrafast \
    #     -tune zerolatency \
    #     -c:v libvpx -b:v 1M \
    #     -f rtp \
    #     -loglevel verbose \
    #     -sdp_file video.sdp \
    #     rtp://localhost:5004

# -f rtp \
    # -sdp_file video.sdp \
    # "rtp://localhost:5009"

# ffmpeg -re -f h264 -framerate 20 -i "tcp://127.0.0.1:1234" \
    #     -an \
    #     -loglevel verbose \
    #     -c copy \
    #     -f rtp \
    #     -sdp_file video.sdp \
    #     "rtp://127.0.0.1:5004"

# ffmpeg -re -i "tcp://localhost:1234" \
    #     -an \
    #     -c copy \
    #     -f rtp \
    #     -sdp_file video.sdp \
    #     "rtp://localhost:5004/janus"
# ffmpeg -f h264 -i "tcp://localhost:1234" -t 7 -c:v copy output.mp4
# -preset ultrafast \
    # -tune zerolatency \

