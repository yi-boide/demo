/*
 * @Descriptin: entity
 * @Version: 0.1
 * @Autor: boide gui
 * @Date: 2020-12-30 16:51:14
 * @LastEditors: boide gui
 * @LastEditTime: 2021-01-07 17:44:53
 */
import { ApiProperty } from '@nestjs/swagger';

export class UploadDao {
  // swagger配置项
  @ApiProperty({ type: 'array', items: { type: 'string', format: 'binary' } })
  file: any[];
}
export class UploadsDao {
  @ApiProperty({ description: '文件id' })
  id: number;

  @ApiProperty({ description: '文件名称' })
  name: string;

  @ApiProperty({ description: '文件相对路径' })
  path: string;

  @ApiProperty({ description: '文件路径' })
  pathUrl?: string;

  @ApiProperty({ description: '文件大小' })
  size?: number;

  @ApiProperty({ description: '文件类型' })
  type?: string;

  @ApiProperty({ description: '文件创建时间' })
  createTime: string;
}