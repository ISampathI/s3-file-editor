import axios from "axios";
import { FolderObj } from "../types/interfaces";

const api = axios.create({
  baseURL: "http://localhost:4000",
});

export const getS3Tree = async () => {
  try {
    const response = await api.get("/s3/list-objects");
    return response.data as FolderObj[];
  } catch (err) {
    console.log(err);
  }
};

export const getS3File = async (key: string) => {
  try {
    const response = await api.post("/s3/get-file", { key });
    return response.data;
  } catch (err) {
    console.log(err);
  }
};

export const updateS3File = async (key: string, content: string) => {
  try {
    const response = await api.post("/s3/update-file", { key, content });
    return response.data;
  } catch (err) {
    console.log(err);
  }
};
