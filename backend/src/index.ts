import startAndroid from "./android";
import startFfmpeg from "./ffmpeg";
import startJanus from "./janus";

startJanus("configs", "janus.jcfg");
startAndroid("./src/android/scrcpy-server-v2.5.jar");
await Bun.sleep(4000);
startFfmpeg("127.0.0.1:1234", "127.0.0.1:5004"); // , "5004", "5002"
