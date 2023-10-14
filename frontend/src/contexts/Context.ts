import { createContext } from "react";
import {
  SelectedBucketContextType,
  SelectedFileContextType,
} from "../types/interfaces";

export const SelectedFileContext = createContext<
  SelectedFileContextType | undefined
>(undefined);

export const SelectedBucketContext = createContext<
  SelectedBucketContextType | undefined
>(undefined);
