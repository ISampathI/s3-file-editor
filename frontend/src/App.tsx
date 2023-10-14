import React from "react";
import logo from "./logo.svg";
import "./App.scss";
import FolderTree from "./components/folder-tree/FolderTree";
import HomePage from "./pages/home/HomePage";
import PageHeader from "./components/header/PageHeader";
import { SelectedBucketContext, SelectedFileContext } from "./contexts/Context";
import { FileObj } from "./types/interfaces";

function App() {
  const [selectedFile, setSelectedFile] = React.useState<FileObj>();
  const [selectedBucket, setSelectedBucket] = React.useState<string>();

  return (
    <div className="App">
      <SelectedBucketContext.Provider
        value={{ selectedBucket, setSelectedBucket }}
      >
        <SelectedFileContext.Provider value={{ selectedFile, setSelectedFile }}>
          <HomePage />
        </SelectedFileContext.Provider>
      </SelectedBucketContext.Provider>
    </div>
  );
}

export default App;
