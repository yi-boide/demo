/*
 * @Descriptin: entity
 * @Version: 0.1
 * @Autor: boide gui
 * @Date: 2020-12-30 16:51:14
 * @LastEditors: boide gui
 * @LastEditTime: 2021-01-07 17:43:02
 */
import { ApiProperty } from '@nestjs/swagger';

export class ConfigDao {
  @ApiProperty({ description: '配置唯一id,创建用户不传' })
  id?: number;
  @ApiProperty({ description: '网站名称' })
  websiteName?: string;
  @ApiProperty({ description: '网站logo' })
  logo?: string;
  @ApiProperty({ description: '网站公告' })
  notice?: string;
  @ApiProperty({ description: '联系我们跳转链接' })
  about?: string;
  createTime?: string;
  updateTime?: string | null;
}
