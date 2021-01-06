/*
 * @Descriptin: module层
 * @Version: 0.1
 * @Autor: boide gui
 * @Date: 2020-12-31 13:16:49
 * @LastEditors: boide gui
 * @LastEditTime: 2021-01-06 18:48:34
 */
import { Module } from '@nestjs/common';
import { UploadController } from './upload.controller';
import { UploadService } from './upload.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Upload } from './Upload.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Upload])],
  controllers: [UploadController],
  providers: [UploadService],
})
export class UploadModule {}
