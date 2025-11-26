import { BrowserRouter } from "react-router-dom";
import AppRouter from "./router/Router";

export default function App() {
  return (
    <BrowserRouter>
      <AppRouter />
    </BrowserRouter>
  );
}
