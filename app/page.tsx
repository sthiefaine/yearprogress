import { App } from "./components/App";

export default function Home() {
  return <App serverDate={new Date()} />;
}
