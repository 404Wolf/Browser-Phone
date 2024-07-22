$run_test_emulator > /dev/null & disown;

while true; do
  # Run adb devices and capture its output
  devices_output=$(adb devices)

  # Check if the word "online" appears in the output
  if echo "$devices_output" | grep -q "\s*online$"; then
    echo "At least one device is online!"
    break
  else
     echo "No device is currently online, waiting..."
    sleep 1  # Adjust the sleep time as needed
  fi
done

$scrcpy;
