ffmpeg -i tcp://localhost:1234 \
    -c:a copy \
    -loglevel verbose \
    -vn \
    -f rtp rtp://localhost:5002
