/*
 * @Descriptin: entity
 * @Version: 0.1
 * @Autor: boide gui
 * @Date: 2020-12-30 16:51:14
 * @LastEditors: boide gui
 * @LastEditTime: 2021-01-15 17:26:01
 */
import { ApiProperty } from '@nestjs/swagger';

export class ProblemDao {
  @ApiProperty({ description: 'id,创建不传' })
  id?: number;
  @ApiProperty({ description: '常见问题标题' })
  title?: string;
  @ApiProperty({ description: '常见问题描述' })
  describe?: string;
  @ApiProperty({ description: '常见问题描述内容' })
  content?: string;
  createTime?: string;
  updateTime?: string | null;
}
