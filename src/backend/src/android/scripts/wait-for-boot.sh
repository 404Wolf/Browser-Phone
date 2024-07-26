$ADB wait-for-device
echo "Emulator has given a heartbeat"

while [[ $("$ADB" shell getprop sys.boot_completed 2>/dev/null) != "1" ]]; do
    echo "Waiting for emulator to boot..."
    sleep 1
done

echo "Emulator is booted."
