import React from "react";
import {
  AuthContext,
  DarkModeContext,
  SelectedBucketContext,
  SelectedFileContext,
} from "../../contexts/Context";
import { Auth, FileObj } from "../../types/interfaces";

export default function ContextProvider({
  children,
}: React.PropsWithChildren<{}>) {
  const [selectedFile, setSelectedFile] = React.useState<FileObj>();
  const [selectedBucket, setSelectedBucket] = React.useState<string>();
  const [auth, setAuth] = React.useState<Auth>();
  const [darkMode, setDarkMode] = React.useState<boolean | undefined>(true);

  return (
    <DarkModeContext.Provider value={{ darkMode, setDarkMode }}>
      <AuthContext.Provider value={{ auth, setAuth }}>
        <SelectedBucketContext.Provider
          value={{ selectedBucket, setSelectedBucket }}
        >
          <SelectedFileContext.Provider
            value={{ selectedFile, setSelectedFile }}
          >
            {children}
          </SelectedFileContext.Provider>
        </SelectedBucketContext.Provider>
      </AuthContext.Provider>
    </DarkModeContext.Provider>
  );
}
