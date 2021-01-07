/*
 * @Descriptin:
 * @Version: 0.1
 * @Autor: boide gui
 * @Date: 2021-01-07 17:38:32
 * @LastEditors: boide gui
 * @LastEditTime: 2021-01-07 17:39:08
 */
import { ApiProperty } from '@nestjs/swagger';

export class UserDao {
  @ApiProperty({ description: '用户id,创建用户不传' })
  id?: number;
  @ApiProperty({ description: '用户名' })
  name: string;
  @ApiProperty({ description: '用户手机号' })
  phone?: string;
  @ApiProperty({ description: '用户性别' })
  sex: number;
}
