ffmpeg -i video.mp4 \
    -c:v libx264 \
    -c:a aac \
    -b:v:0 800k \
    -b:v:1 300k \
    -b:a:0 96k \
    -b:a:1 48

