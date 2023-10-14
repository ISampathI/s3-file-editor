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

export interface SelectedFileContextType {
  selectedFile: FileObj | undefined;
  setSelectedFile: React.Dispatch<React.SetStateAction<FileObj | undefined>>;
}
