/*
 * @Descriptin: controller层
 * @Version: 0.1
 * @Autor: boide gui
 * @Date: 2020-12-30 16:09:46
 * @LastEditors: boide gui
 * @LastEditTime: 2020-12-31 17:18:49
 */
import { Controller, Get, Post, Delete, Body, Param } from '@nestjs/common';
import { UserService } from './user.service';
import { ApiTags, ApiParam, ApiBody } from '@nestjs/swagger';
import { IHttpData, UserData } from '../../utils/relust'

@ApiTags('用户接口')
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) { }

  // 查询用户信息
  @Get('list')
  async findAll(): Promise<IHttpData> {
    const data: any = await this.userService.findAll();
    const result: IHttpData = {
      code: 0,
      data,
      msg: '获取成功'
    }
    return result
  }

  // 根据id用户信息
  @Get(':id')
  @ApiParam({
    name: 'id',
    description: '这是用户id'
  })
  async getById(@Param('id') id: number): Promise<IHttpData> {
    const data: any = await this.userService.getById(id);
    const result: IHttpData = {
      code: 0,
      data,
      msg: '获取成功'
    }
    return result
  }

  // 新增用户信息
  @Post('add')
  @ApiBody({type: UserData})
  async addUser(@Body() userData: UserData): Promise<IHttpData> {
    this.userService.create(userData);
    const result: IHttpData = {
      code: 0,
      data: null,
      msg: '新增成功'
    }
    return result
  }

  // 修改用户信息
  @Post('update')
  async updateUser(@Body() userData: UserData): Promise<IHttpData> {
    this.userService.update(userData);
    const result: IHttpData = {
      code: 0,
      data: null,
      msg: '修改成功'
    }
    return result
  }

  // 删除用户用户信息
  @Delete(':id')
  @ApiParam({
    name: 'id',
    description: '这是用户id'
  })
  async deleteUser(@Param('id') id: number): Promise<IHttpData> {
    this.userService.delete(id);
    const result: IHttpData = {
      code: 0,
      data: null,
      msg: '删除成功'
    }
    return result
  }
}
