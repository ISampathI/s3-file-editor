import { Injectable } from '@nestjs/common';
import { S3 } from 'aws-sdk';
import {
  FileObj,
  FolderObj,
} from '../../shared/interfaces/folderTree.interface';

@Injectable()
export class S3Service {
  private readonly s3: S3;

  constructor() {
    this.s3 = new S3({
      accessKeyId: process.env.AWS_ACCESS_KEY_ID,
      secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
      region: process.env.AWS_REGION,
    });
  }

  getHello(): any {
    return {
      message: 'Hello World!',
    };
  }

  async getFileData(key: string): Promise<any> {
    const file = await this.s3
      .getObject({
        Bucket: process.env.AWS_BUCKET_NAME,
        Key: key,
      })
      .promise();

    return JSON.stringify(file.Body.toString());
  }

  async updateFile(key: string, content: string): Promise<any> {
    await this.s3
      .putObject({
        Bucket: process.env.AWS_BUCKET_NAME,
        Key: key,
        Body: content,
      })
      .promise();

    return {
      message: 'File updated successfully',
    };
  }

  async listObjects(): Promise<any> {
    const files = await this.s3
      .listObjectsV2({
        Bucket: process.env.AWS_BUCKET_NAME,
      })
      .promise();

    let folderTree: any = convertToTree(files);

    return [...folderTree.subfolders, ...folderTree.files];
  }
}

function convertToTree(objectListing: any): FolderObj {
  const tree: FolderObj = {
    key: '',
    level: 0,
    subfolders: [],
    files: [],
  };

  for (const content of objectListing.Contents) {
    const parts = content.Key.split('/');
    let currentNode = tree;

    for (let i = 0; i < parts.length; i++) {
      const part = parts[i];
      if (i === parts.length - 1 && part !== '') {
        const file: FileObj = {
          key: content.Key,
          lastModified: new Date(content.LastModified),
          size: content.Size,
        };
        currentNode.files.push(file);
      } else {
        if (part !== '') {
          const folder: FolderObj = {
            key: `${parts.slice(0, i + 1).join('/')}/`,
            level: i + 1 - 1,
            subfolders: [],
            files: [],
          };
          const existingFolder = currentNode.subfolders.find(
            (subfolder) => subfolder.key === folder.key,
          );
          if (existingFolder) {
            currentNode = existingFolder;
          } else {
            currentNode.subfolders.push(folder);
            currentNode = folder;
          }
        }
      }
    }
  }

  return tree;
}
