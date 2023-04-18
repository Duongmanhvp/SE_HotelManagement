import { BrowserRouter } from "react-router-dom";
import UserProvider from "./context/UserContext";
import AppRoute from "./route/AppRoute";

function App() {
  return (
    <BrowserRouter>
      <AppRoute></AppRoute>
    </BrowserRouter>
  );
}

export default App;
