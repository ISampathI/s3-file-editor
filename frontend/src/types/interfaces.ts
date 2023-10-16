export interface FileObj {
  key: string;
  lastModified: Date;
  size: number;
}

export interface FolderObj {
  key: string;
  level: number;
  subfolders?: FolderObj[];
  files?: FileObj[];
}

export interface Auth {
  user: {
    username: string;
  };
}

//context types
export interface SelectedFileContextType {
  selectedFile: FileObj | undefined;
  setSelectedFile: React.Dispatch<React.SetStateAction<FileObj | undefined>>;
}

export interface SelectedBucketContextType {
  selectedBucket: string | undefined;
  setSelectedBucket: React.Dispatch<React.SetStateAction<string | undefined>>;
}

export interface AuthContextType {
  auth: {} | undefined;
  setAuth: React.Dispatch<React.SetStateAction<Auth | undefined>>;
}
