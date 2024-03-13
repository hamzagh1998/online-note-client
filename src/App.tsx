import { BrowserRouter } from "react-router-dom";
import { RoutesNavigator } from "./routes/routes.navigator";

export default function App() {
  return (
    <>
      <BrowserRouter>
        <RoutesNavigator />
      </BrowserRouter>
    </>
  );
}
