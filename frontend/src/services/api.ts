import axios from "axios";
import { FolderObj } from "../types/interfaces";

interface GetS3TreeResponse {
  bucket: string;
  objectList: FolderObj[];
}

const api = axios.create({
  baseURL: "http://localhost:4000",
});

export const getS3Tree = async (bucket: string) => {
  try {
    const response = await api.get("/s3/list-objects", { params: { bucket } });
    return response.data as GetS3TreeResponse;
  } catch (err) {
    console.log(err);
  }
};

export const getS3File = async (key: string, bucket: string) => {
  try {
    const response = await api.post("/s3/get-file", { key, bucket });
    return response.data;
  } catch (err) {
    console.log(err);
  }
};

export const updateS3File = async (
  key: string,
  content: string,
  bucket: string
) => {
  try {
    const response = await api.post("/s3/update-file", { key, content, bucket });
    return response;
  } catch (err) {
    console.log(err);
  }
};

export const getS3BucketList = async () => {
  try {
    const response = await api.get("/s3/bucket-list");
    return response.data;
  } catch (err) {
    console.log(err);
  }
};
