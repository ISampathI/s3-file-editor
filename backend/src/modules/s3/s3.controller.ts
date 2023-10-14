import { Controller, Get, Body, Post, Query } from '@nestjs/common';
import { S3Service } from './s3.service';

@Controller('s3')
export class S3Controller {
  constructor(private s3service: S3Service) {}

  @Get('bucket-list')
  async bucketList() {
    return await this.s3service.bucketList();
  }

  @Get('list-objects')
  async listObjects(@Query('bucket') bucket: string) {
    return await this.s3service.listObjects(bucket);
  }

  @Post('get-file')
  async getFile(@Body() body: { key: string; bucket: string }) {
    return await this.s3service.getFileData(body.key, body.bucket);
  }

  @Post('update-file')
  async updateFile(
    @Body() body: { key: string; content: string; bucket: string },
  ) {
    return await this.s3service.updateFile(body.key, body.content, body.bucket);
  }
}
