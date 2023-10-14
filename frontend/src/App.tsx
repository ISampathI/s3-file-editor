import React from "react";
import logo from "./logo.svg";
import "./App.scss";
import FolderTree from "./components/folder-tree/FolderTree";
import HomePage from "./pages/home/HomePage";
import PageHeader from "./components/header/PageHeader";
import { SelectedFileContext } from "./contexts/Context";
import { FileObj } from "./types/interfaces";

function App() {
  const [selectedFile, setSelectedFile] = React.useState<FileObj>();

  return (
    <div className="App">
      <SelectedFileContext.Provider value={{ selectedFile, setSelectedFile }}>
        <HomePage />
      </SelectedFileContext.Provider>
    </div>
  );
}

export default App;
