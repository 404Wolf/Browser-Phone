# -re  Live source. Don't read the entire video file instantly, rather stream it slowly.
# -i video.mp4 Input file
# -an Disable audio
# -c:v copy Copy the video codec. Disables transcoding.
# -f rtp Output format. Real-time protocol.
# -sdp_file video.sdp SDP file. Contains information about the stream.
# "rtp://localhost:5004" Output URL. IP address and port number.

while true; do
    ffmpeg \
        -re \
        -i video.mp4 \
        -an \
        -c:v copy \
        -f rtp \
        -sdp_file video.sdp \
        "rtp://localhost:5004"
done
