{
  android-tools,
  system,
  ...
}:
android-tools.sdk.${system} (sdkPkgs:
    with sdkPkgs; [
      cmdline-tools-latest
      build-tools-34-0-0
      platform-tools
      platforms-android-34
      emulator
    ])
