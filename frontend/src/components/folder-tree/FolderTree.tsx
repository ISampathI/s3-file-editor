import React, { useContext, useEffect, useState } from "react";
import "./styles.scss";
import { getIcon } from "../../utils/Icon";
import { getS3BucketList, getS3Tree } from "../../services/api";
import { FileObj, FolderObj } from "../../types/interfaces";
import {
  SelectedBucketContext,
  SelectedFileContext,
} from "../../contexts/Context";
import { Select } from "antd";

interface FolderTreeProps {
  onFileSelect: (file: FileObj) => void;
}

const FolderTree: React.FC<FolderTreeProps> = ({ onFileSelect }) => {
  const selectedBucketContext = useContext(SelectedBucketContext);
  const selectedFileContext = useContext(SelectedFileContext);

  const [expandedFolders, setExpandedFolders] = useState<string[]>([]);
  const [tree, setTree] = useState<FolderObj[]>([]);
  const [bucketList, setBucketList] = useState<any>([]);

  useEffect(() => {
    fetchBucketList();
  }, []);

  const fetchBucketList = async () => {
    const data = await getS3BucketList();
    if (data) {
      const bucketList = data.map((bucket: string) => {
        return { value: bucket, label: bucket };
      });
      setBucketList(bucketList);
    } else {
      setBucketList([]);
    }
  };
  const fetchBucketData = async (bucket: string) => {
    const data = await getS3Tree(bucket);
    if (data) {
      setTree(data.objectList);
    } else {
      setTree([]);
    }
  };

  const toggleFolder = (folderId: string) => {
    setExpandedFolders((prevState) =>
      prevState.includes(folderId)
        ? prevState.filter((id) => id !== folderId)
        : [...prevState, folderId]
    );
  };

  const renderFiles = (files: FileObj[], folder?: FolderObj) => {
    return files.map((file) => {
      const fileName = file.key.split("/")[file.key.split("/").length - 1];
      return (
        <div
          onClick={async () => {
            selectedFileContext?.setSelectedFile(file);
            onFileSelect(file);
          }}
          className={`file ${
            selectedFileContext?.selectedFile?.key === file.key && "active"
          }`}
          key={file.key}
          style={{
            paddingLeft: `${folder ? folder.level * 20 + 20 : 0}px`,
            cursor: "pointer",
          }}
        >
          {getFileIcon({ name: fileName, extension: fileName.split(".")[1] })}{" "}
          {fileName}
        </div>
      );
    });
  };

  const renderFolders = (folders: any[]) => {
    return folders.map((folder) => {
      const parts = folder.key.split("/");
      if (parts.length === 1) {
        const files: FileObj[] = [
          {
            key: folder.key,
            lastModified: folder.lastModified,
            size: folder.size,
          },
        ];
        return renderFiles(files);
      } else {
        const folderName =
          folder.key.split("/")[folder.key.split("/").length - 2];
        return (
          <div key={folder.key}>
            <div
              className={`folder ${
                expandedFolders.includes(folder.key) && "active"
              }`}
              style={{
                paddingLeft: `${folder.level * 20}px`,
                cursor: "pointer",
              }}
              onClick={() => toggleFolder(folder.key)}
            >
              <i className="fa-regular fa-folder"></i>
              {folderName}
            </div>
            {expandedFolders.includes(folder.key) && folder.subfolders && (
              <div>
                {renderFolders(folder.subfolders)}
                {folder.files && renderFiles(folder.files, folder)}
              </div>
            )}
          </div>
        );
      }
    });
  };

  const getFileIcon = ({
    extension,
    name,
  }: {
    name?: string;
    extension?: string;
  }) => {
    let icon = getIcon(extension || "", name || "");
    return <span className="file-icon">{icon}</span>;
  };

  const onChange = (value: string) => {
    selectedBucketContext?.setSelectedBucket(value);
    fetchBucketData(value);
  };

  return (
    <div className="FolderTree">
      <div className="bucket">
        <i className="fa-solid fa-bucket"></i>
        <Select
          className="select-bucket"
          showSearch
          placeholder="Select a Bucket"
          onChange={onChange}
          options={bucketList}
        />
      </div>
      {renderFolders(tree)}
    </div>
  );
};

export default FolderTree;
