export const getLanguageFromFilename = (filename: string) => {
  const extension = filename.split(".").pop();
  switch (extension) {
    case "js":
      return "javascript";
    case "ts":
      return "typescript";
    case "tsx":
      return "typescript";
    case "py":
      return "python";
    case "rb":
      return "ruby";
    case "java":
      return "java";
    case "c":
      return "c";
    case "cpp":
      return "cpp";
    case "cs":
      return "csharp";
    case "go":
      return "golang";
    case "rs":
      return "rust";
    case "php":
      return "php";
    case "html":
      return "html";
    case "css":
      return "css";
    case "json":
      return "json";
    case "xml":
      return "xml";
    case "sql":
      return "sql";
    case "md":
      return "markdown";
    default:
      return "plaintext";
  }
};
