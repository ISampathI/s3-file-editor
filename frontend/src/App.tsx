import { RouterProvider, createBrowserRouter } from "react-router-dom";
import "./App.scss";
import ContextProvider from "./components/context-provider/ContextProvider";
import HomePage from "./pages/home/HomePage";
import LoginPage from "./pages/login/LoginPage";
import { ConfigProvider, theme } from "antd";
import { useContext, useEffect } from "react";
import { DarkModeContext } from "./contexts/Context";
import React from "react";

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
  const darkMode = React.useContext(DarkModeContext);

  return (
    <div className={`App ${darkMode?.darkMode ? "dark-mode" : "light-mode"}`}>
      <ConfigProvider
        theme={{
          token: {
            colorPrimary: "#3acd8e",
            colorInfo: "#3acd8e",
          },
          algorithm: darkMode?.darkMode
            ? theme.darkAlgorithm
            : theme.defaultAlgorithm,
        }}
      >
        <RouterProvider router={router} />
      </ConfigProvider>
    </div>
  );
}

export default App;
