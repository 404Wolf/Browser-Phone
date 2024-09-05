ffmpeg -re \
    -i tcp://localhost:1234 \
    -an \
    -c:v copy \
    -flags low_delay \
    -fflags nobuffer \
    -analyzeduration 0 \
    -loglevel verbose \
    -sdp_file video.sdp \
    -f rtp rtp://localhost:5004
