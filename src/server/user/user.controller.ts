/*
 * @Descriptin: controller层
 * @Version: 0.1
 * @Autor: boide gui
 * @Date: 2020-12-30 16:09:46
 * @LastEditors: boide gui
 * @LastEditTime: 2021-01-15 18:41:24
 */
import { Controller, Get, Post, Delete, Body, Param } from '@nestjs/common';
import { UserService } from './user.service';
import { ApiTags, ApiParam, ApiBody, ApiOperation } from '@nestjs/swagger';
import { IHttpData, Relust } from '../../utils/relust';
import { UserDao } from './user.dao';

@ApiTags('用户接口')
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  // 查询用户信息
  @ApiOperation({ summary: '查询用户信息' })
  @Get('list')
  async findAll(): Promise<IHttpData> {
    const data: any = await this.userService.findAll();
    return new Relust(data, 0, '获取成功');
  }

  // 根据id用户信息
  @ApiOperation({ summary: '根据id用户信息' })
  @Get(':id')
  @ApiParam({
    name: 'id',
    description: '这是用户id',
  })
  async getById(@Param('id') id: number): Promise<IHttpData> {
    const data: any = await this.userService.getById(id);
    return new Relust(data, 0, '获取成功');
  }

  // 新增用户信息
  @ApiOperation({ summary: '新增用户信息' })
  @Post('add')
  @ApiBody({ type: UserDao })
  async addUser(@Body() userData: UserDao): Promise<IHttpData> {
    this.userService.create(userData);
    return new Relust(null, 0, '新增成功');
  }

  // 修改用户信息
  @ApiOperation({ summary: '修改用户信息' })
  @Post('update')
  async updateUser(@Body() userData: UserDao): Promise<IHttpData> {
    this.userService.update(userData);
    return new Relust(null, 0, '修改成功');
  }

  // 删除用户用户信息
  @ApiOperation({ summary: '删除用户用户信息' })
  @Delete(':id')
  @ApiParam({
    name: 'id',
    description: '这是用户id',
  })
  async deleteUser(@Param('id') id: number): Promise<IHttpData> {
    this.userService.delete(id);
    return new Relust(null, 0, '删除成功');
  }
}
