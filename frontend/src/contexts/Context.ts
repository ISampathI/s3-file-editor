import { createContext } from "react";
import {
  AuthContextType,
  SelectedBucketContextType,
  SelectedFileContextType,
} from "../types/interfaces";

export const SelectedFileContext = createContext<
  SelectedFileContextType | undefined
>(undefined);

export const SelectedBucketContext = createContext<
  SelectedBucketContextType | undefined
>(undefined);

export const AuthContext = createContext<AuthContextType | undefined>(
  undefined
);
