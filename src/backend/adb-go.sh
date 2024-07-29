# adb shell CLASSPATH=/data/local/tmp/scrcpy-server-v2.5.jar \
    #     app_process / com.genymobile.scrcpy.Server 2.5 \
    #     tunnel_forward=true \
    #     audio=false \
    #     control=false \
    #     control=false \
    #     cleanup=false \
    #     video_source=display \
    #     max_fps=20 \
    #     raw_stream=true \
    #     max_size=1920 \
    # video_codec=h265

adb push /home/wolf/Documents/projects/Browser-Phone/src/backend/src/android/scrcpy-server-v2.5.jar /data/local/tmp/scrcpy-server-v2.5.jar
adb forward tcp:1234 localabstract:scrcpy
adb shell CLASSPATH=/data/local/tmp/scrcpy-server-v2.5.jar \
    app_process / com.genymobile.scrcpy.Server 2.5 \
    tunnel_forward=true \
    audio=false \
    control=false \
    cleanup=false \
    raw_stream=true \
    max_fps=15 \
    max_size=1920 \
    log_level=debug
