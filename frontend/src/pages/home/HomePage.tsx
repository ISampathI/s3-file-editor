import React from "react";
import FolderTree from "../../components/folder-tree/FolderTree";
import "./styles.scss";
import { Editor } from "@monaco-editor/react";
import { getS3File, updateS3File } from "../../services/api";
import { getLanguageFromFilename } from "../../utils/editor";
import PageHeader from "../../components/header/PageHeader";
import { SelectedFileContext } from "../../contexts/Context";

export default function HomePage() {
  const [fileData, setFileData] = React.useState<string>("");
  const [language, setLanguage] = React.useState<string>("javascript");
  const selectedFileContext = React.useContext(SelectedFileContext);

  const handleFileClick = async (file: any) => {
    const data = await getS3File(file.key);
    setLanguage(getLanguageFromFilename(file.key));
    setFileData(data);
  };

  return (
    <>
      <PageHeader file={selectedFileContext?.selectedFile}/>
      <div className="HomePage">
        <div className="side-bar">
          <FolderTree onFileSelect={handleFileClick} />
        </div>
        <div className="code-editor">
          <Editor
            className="editor"
            height="100%"
            width="100%"
            theme="vs-dark"
            defaultLanguage="javascript"
            language={language}
            defaultValue="// some comment"
            value={fileData}
            onChange={(value) => setFileData(value ?? "")}
          />
        </div>
      </div>
    </>
  );
}
