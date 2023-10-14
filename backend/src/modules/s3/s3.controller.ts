import { Controller, Get, Body, Post } from '@nestjs/common';
import { S3Service } from './s3.service';

@Controller('s3')
export class S3Controller {
  constructor(private s3service: S3Service) {}

  @Get()
  getHello(): string {
    return this.s3service.getHello();
  }

  @Get('list-objects')
  async listObjects() {
    return await this.s3service.listObjects();
  }

  @Post('get-file')
  async getFile(@Body() body: { key: string }) {
    return await this.s3service.getFileData(body.key);
  }

  @Post('update-file')
  async updateFile(@Body() body: { key: string; content: string }) {
    return await this.s3service.updateFile(body.key, body.content);
  }
}
