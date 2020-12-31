/*
 * @Descriptin: 文件上传
 * @Version: 0.1
 * @Autor: boide gui
 * @Date: 2020-12-31 13:15:53
 * @LastEditors: boide gui
 * @LastEditTime: 2020-12-31 15:43:48
 */
import { Controller, Post, UseInterceptors, UploadedFiles, Body } from '@nestjs/common';
import { FilesInterceptor } from '@nestjs/platform-express';
import { UploadService } from './upload.service';
import { IHttpData } from '../../utils/relust'

@Controller('upload')
export class UploadController {
  constructor(private readonly uploadService: UploadService) { }

  // 支持上传多个文件
  @Post()
  @UseInterceptors(FilesInterceptor('file')) // file对应HTML表单的name属性
  async UploadedFile(@UploadedFiles() files, @Body() body): Promise<IHttpData>{
    let result: IHttpData = {
      code: 0,
      data: null,
      msg: ''
    }
    if (!files || files.length === 0) {
      result.code = -1
      result.msg = '未选择文件'
      return result
    }
    const data = await this.uploadService.create(files, body)
    result.code = 0
    result.data = data
    result.msg = '上传成功'
    return result
  }
}
