import { Controller, Get, Post, UseInterceptors, UploadedFile } from '@nestjs/common';
import { AppService } from './app.service';
import {FileInterceptor} from '@nestjs/platform-express';
import { ApiTags } from '@nestjs/swagger';
@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Post('upload')
  @ApiTags('图片上传')
  @UseInterceptors(FileInterceptor('file'))
  async upload(@UploadedFile('file') file) {
    return {
      url: `http://localhost:3000/${file.path}`,
    };
  }
}
