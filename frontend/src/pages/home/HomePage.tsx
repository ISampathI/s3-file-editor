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
  const [loading, setLoading] = React.useState<boolean>(false);

  const selectedFileContext = React.useContext(SelectedFileContext);

  const handleFileClick = async (file: any) => {
    setLoading(true);
    const data = await getS3File(file.key);
    setLanguage(getLanguageFromFilename(file.key));
    setFileData(data);
    setLoading(false);
  };

  const handleFileSave = async () => {
    if (selectedFileContext?.selectedFile) {
      setLoading(true);
      await updateS3File(selectedFileContext?.selectedFile.key, fileData);
      setLoading(false);
    }
  };

  return (
    <>
      <PageHeader
        file={selectedFileContext?.selectedFile}
        onFileSave={handleFileSave}
        fileLoading={loading}
      />
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
