$ADB shell settings put global development_settings_enabled 1
$ADB shell settings put global adb_wifi_enabled 1
$ADB push "$SCRCPY_SERVER_PATH" /data/local/tmp/scrcpy-server-v2.5.jar
$ADB forward tcp:1234 localabstract:scrcpyadb
sleep 2
$ADB shell CLASSPATH=/data/local/tmp/scrcpy-server-v2.5.jar \
    app_process / com.genymobile.scrcpy.Server 2.5 \
    tunnel_forward=true \
    audio=false \
    control=false \
    cleanup=false \
    raw_stream=true \
    max_size=1920 \
    log_leve=debug \
    video_encoding="h26444"
