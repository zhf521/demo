import {
  Controller,
  Post,
  UploadedFile,
  UseInterceptors,
  UsePipes,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { FileSizeValidationPipe } from './fileSize.pipe';

@Controller('upload')
export class UploadController {
  @Post()
  @UseInterceptors(FileInterceptor('file'))
  @UsePipes(FileSizeValidationPipe)
  uploadFile(@UploadedFile() file: Express.Multer.File) {
    return {
      file,
    };
  }
}
