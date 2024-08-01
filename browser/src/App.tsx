import Android from "./components/Android";

export default function App() {
  return <Android ip={["ws://127.0.0.1:8188"]} apiSecret="secret" />
}
