import { RouterProvider, createBrowserRouter } from "react-router-dom";
import "./App.scss";
import ContextProvider from "./components/context-provider/ContextProvider";
import HomePage from "./pages/home/HomePage";
import LoginPage from "./pages/login/LoginPage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <HomePage />,
  },
  {
    path: "/login",
    element: <LoginPage />,
  },
]);

function App() {
  return (
    <div className="App">
      <ContextProvider>
        <RouterProvider router={router} />
      </ContextProvider>
    </div>
  );
}

export default App;
