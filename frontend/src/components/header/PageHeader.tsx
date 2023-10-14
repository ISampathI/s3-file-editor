import React from "react";
import "./styles.scss";
import { FileObj } from "../../types/interfaces";

interface PageHeaderProps {
  file?: FileObj;
  onFileSave?: () => Promise<void>;
  fileLoading?: boolean;
}

export default function PageHeader({
  file,
  onFileSave,
  fileLoading,
}: PageHeaderProps) {
  const [showLogin, setShowLogin] = React.useState<boolean>(false);

  return (
    <div className="PageHeader">
      <div className="title">
        <span>S3</span> File Editor
      </div>
      <div className="file-path">
        {file?.key.split("/").map((path, index) => {
          return (
            <span key={index}>
              {path}
              {index !== file?.key.split("/").length - 1 && (
                <span className="separater">{">"}</span>
              )}
            </span>
          );
        })}
      </div>

      <button
        disabled={!file || fileLoading}
        className={`save-btn ${fileLoading ? "loading" : ""}`}
        onClick={onFileSave}
      >
        <i className="fa-solid fa-floppy-disk"></i>
      </button>
      <div className="profile">
        <div
          onClick={() => {
            setShowLogin(!showLogin);
          }}
          className="select-none cursor-pointer ml-5 relative inline-flex items-center justify-center w-10 h-10 overflow-hidden bg-gray-100 rounded-full dark:bg-gray-600"
        >
          <span className="font-medium text-gray-600 dark:text-gray-300">
            JL
          </span>
        </div>
        <div
          className={`login-form ${
            showLogin ? "login-form-show" : "login-form-hide"
          }`}
        >
          <input type="text" placeholder="User Name" />
          <input type="password" placeholder="Password" />
          <button className="bg-black">LOGIN</button>
        </div>
      </div>
    </div>
  );
}
