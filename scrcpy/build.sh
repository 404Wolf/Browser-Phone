set -e

: "${SCRCPY_VERSION_NAME:="2.6.1"}"
: "${SCRCPY_DEBUG:=false}"
: "SERVER_DIR:=$(dirname "$0")"

NEW_ANDROID_HOME="$(mktemp -d)"
cp --no-preserve=mode -r "$ANDROID_HOME" "$NEW_ANDROID_HOME"
ANDROID_HOME="$NEW_ANDROID_HOME/android-sdk"

PLATFORM=${ANDROID_PLATFORM:-34}
BUILD_TOOLS=${ANDROID_BUILD_TOOLS:-34.0.0}
BUILD_TOOLS_DIR="$ANDROID_HOME/build-tools/$BUILD_TOOLS"

BUILD_DIR="$(realpath "${BUILD_DIR:-dist}")"
CLASSES_DIR="$BUILD_DIR/classes"
GEN_DIR="$BUILD_DIR/gen"
SERVER_BINARY=scrcpy-server
ANDROID_JAR="$ANDROID_HOME/platforms/android-$PLATFORM/android.jar"
LAMBDA_JAR="$BUILD_TOOLS_DIR/core-lambda-stubs.jar"

echo "Platform: android-$PLATFORM"
echo "Build-tools: $BUILD_TOOLS"
echo "Build dir: $BUILD_DIR"

rm -rf "$CLASSES_DIR" "$GEN_DIR" "${BUILD_DIR:?}/$SERVER_BINARY" classes.dex
mkdir -p "$CLASSES_DIR"
mkdir -p "$GEN_DIR/com/genymobile/scrcpy"

<< EOF cat > "$GEN_DIR/com/genymobile/scrcpy/BuildConfig.java"
package com.genymobile.scrcpy;

public final class BuildConfig {
  public static final boolean DEBUG = $SCRCPY_DEBUG;
  public static final String VERSION_NAME = "$SCRCPY_VERSION_NAME";
}
EOF

echo "Generating java from aidl..."
"$BUILD_TOOLS_DIR/aidl" -o "$GEN_DIR" \
    "$SERVER_DIR/main/aidl/android/view/IRotationWatcher.aidl"
"$BUILD_TOOLS_DIR/aidl" -o "$GEN_DIR" \
    "$SERVER_DIR/main/aidl/android/content/IOnPrimaryClipChangedListener.aidl"
"$BUILD_TOOLS_DIR/aidl" -o "$GEN_DIR" \
    "$SERVER_DIR/main/aidl/android/view/IDisplayFoldListener.aidl"

# SRC=("$(find "$PWD" -name '*.java')")
SRC=$(find src/main/java/com/genymobile/scrcpy/ -name '*.java')

CLASSES=()
for src in "${SRC[@]}"; do
    CLASSES+=("${src%.java}.class")
done

echo "Compiling java sources..."
javac -verbose -bootclasspath "$ANDROID_JAR" \
    -cp "$LAMBDA_JAR:$GEN_DIR" \
    -d "$CLASSES_DIR" \
    -source 1.8 -target 1.8 \
    "${SRC[@]}"

echo "Dexing..."
echo $CLASSES_DIR
echo $BUILD_DIR

"$BUILD_TOOLS_DIR/d8" --classpath "$ANDROID_JAR" \
    --output "$BUILD_DIR/classes.zip" \
    "$CLASSES_DIR"/android/view/*.class \
    "$CLASSES_DIR"/android/content/*.class \
    "${CLASSES[@]}"

cd "$BUILD_DIR"
mv classes.zip "$SERVER_BINARY"

rm -rf "$GEN_DIR" "$CLASSES_DIR"

echo "Server generated in $BUILD_DIR/$SERVER_BINARY"
