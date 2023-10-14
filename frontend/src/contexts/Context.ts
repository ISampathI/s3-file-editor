import { createContext } from "react";
import { SelectedFileContextType } from "../types/interfaces";

export const SelectedFileContext = createContext<
  SelectedFileContextType | undefined
>(undefined);
