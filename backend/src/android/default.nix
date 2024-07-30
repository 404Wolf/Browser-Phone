{
  pkgs ?
    import <nixpkgs> {
      config = {
        allowUnfree = true;
        android_sdk.accept_license = true;
      };
    },
  args,
}:
pkgs.androidenv.emulateApp (builtins.fromJSON args)
