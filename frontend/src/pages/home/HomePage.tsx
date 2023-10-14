import React from "react";
import FolderTree from "../../components/folder-tree/FolderTree";
import "./styles.scss";
import { Editor } from "@monaco-editor/react";
import { getS3File, updateS3File } from "../../services/api";
import { getLanguageFromFilename } from "../../utils/editor";
import PageHeader from "../../components/header/PageHeader";
import {
  SelectedBucketContext,
  SelectedFileContext,
} from "../../contexts/Context";

export default function HomePage() {
  const selectedBucketContext = React.useContext(SelectedBucketContext);
  const selectedFileContext = React.useContext(SelectedFileContext);

  const [fileData, setFileData] = React.useState<string>("");
  const [editorData, setEditorData] = React.useState<string>("");
  const [language, setLanguage] = React.useState<string>("javascript");
  const [loading, setLoading] = React.useState<boolean>(false);
  const [isFileChanged, setIsFileChanged] = React.useState<boolean>(false);

  const handleFileClick = async (file: any) => {
    if (!file || !selectedBucketContext?.selectedBucket) return;
    setLoading(true);
    setEditorData("");
    setFileData("");
    const data = await getS3File(
      file.key,
      selectedBucketContext?.selectedBucket
    );
    setLanguage(getLanguageFromFilename(file.key));
    setFileData(data);
    setEditorData(data);
    setLoading(false);
    setIsFileChanged(false);
  };

  const handleFileSave = async () => {
    if (
      selectedFileContext?.selectedFile &&
      selectedBucketContext?.selectedBucket
    ) {
      if (editorData !== fileData) {
        setLoading(true);
        const res = await updateS3File(
          selectedFileContext?.selectedFile.key,
          editorData,
          selectedBucketContext?.selectedBucket
        );
        if (res?.status === 201) {
          setFileData(editorData);
          setIsFileChanged(false);
        }
        setLoading(false);
      }
    }
  };

  const handleEditorChange = (value: string | undefined) => {
    if (value !== fileData) {
      setIsFileChanged(true);
      setEditorData(value ?? "");
    } else {
      setIsFileChanged(false);
    }
  };

  return (
    <>
      <PageHeader
        file={selectedFileContext?.selectedFile}
        onFileSave={handleFileSave}
        fileLoading={loading}
        isFileChanged={isFileChanged}
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
            value={editorData}
            onChange={handleEditorChange}
            options={{ readOnly: loading }}
          />
        </div>
      </div>
    </>
  );
}
