/*
 * @Descriptin: 文件上传
 * @Version: 0.1
 * @Autor: boide gui
 * @Date: 2020-12-31 13:15:53
 * @LastEditors: boide gui
 * @LastEditTime: 2020-12-31 16:17:29
 */
import {
  Controller,
  Post,
  UseInterceptors,
  UploadedFiles,
  Body,
} from '@nestjs/common';
import { FilesInterceptor } from '@nestjs/platform-express';
import { ApiTags, ApiProperty, ApiConsumes, ApiBody } from '@nestjs/swagger';
import { UploadService } from './upload.service';
import { IHttpData } from '../../utils/relust';
class FilesUploadDto {
  @ApiProperty({ type: 'array', items: { type: 'string', format: 'binary' } })
  file: any[];
}

@ApiTags('文件接口')
@Controller('upload')
export class UploadController {
  constructor(private readonly uploadService: UploadService) {}

  // 支持上传多个文件
  @Post()
  // @UseInterceptors(AnyFilesInterceptor())
  // AnyFilesInterceptor定义任意字段的名称
  @UseInterceptors(FilesInterceptor('file')) // file对应HTML表单的name属性
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    description: '选择文件',
    type: FilesUploadDto,
  })
  async UploadedFile(@UploadedFiles() files, @Body() body): Promise<IHttpData> {
    const result: IHttpData = {
      code: 0,
      data: null,
      msg: '',
    };
    if (!files || files.length === 0) {
      result.code = -1;
      result.msg = '未选择文件';
      return result;
    }
    const data = await this.uploadService.create(files, body);
    result.code = 0;
    result.data = data;
    result.msg = '上传成功';
    return result;
  }
}
