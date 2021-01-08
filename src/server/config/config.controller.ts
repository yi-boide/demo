/*
 * @Descriptin:
 * @Version: 0.1
 * @Autor: boide gui
 * @Date: 2021-01-06 11:43:22
 * @LastEditors: boide gui
 * @LastEditTime: 2021-01-08 10:42:58
 */
import { Controller, Get, Post, Delete, Body, Param } from '@nestjs/common';
import { ConfigService } from './config.service';
import { ApiTags, ApiParam, ApiBody, ApiOperation } from '@nestjs/swagger';
import { IHttpData } from '../../utils/relust';
import { ConfigDao } from './config.dao';

@ApiTags('配置接口')
@Controller('config')
export class ConfigController {
  constructor(private readonly configService: ConfigService) {}

  // 查询所有配置信息
  @ApiOperation({ summary: '查询所有配置信息' })
  @Get('list')
  async findAll(): Promise<IHttpData> {
    const data: any = await this.configService.findAll();
    const result: IHttpData = {
      code: 0,
      data,
      msg: '获取成功',
    };
    return result;
  }

  // 根据id查询配置信息
  @ApiOperation({ summary: '根据id查询配置信息' })
  @Get(':id')
  @ApiParam({
    name: 'id',
    description: '这是配置id',
  })
  async getById(@Param('id') id?: number): Promise<IHttpData> {
    const data: any = await this.configService.getById(id);
    const result: IHttpData = {
      code: 0,
      data,
      msg: '获取成功',
    };
    return result;
  }

  // 新增配置信息
  @ApiOperation({ summary: '新增配置信息' })
  @Post('add')
  @ApiBody({ type: ConfigDao })
  async addConfig(@Body() configDao: ConfigDao): Promise<IHttpData> {
    this.configService.add(configDao);
    const result: IHttpData = {
      code: 0,
      data: null,
      msg: '新增成功',
    };
    return result;
  }

  // 修改配置信息
  @ApiOperation({ summary: '修改配置信息' })
  @Post('update')
  async updateConfig(@Body() configDao: ConfigDao): Promise<IHttpData> {
    this.configService.update(configDao);
    const result: IHttpData = {
      code: 0,
      data: null,
      msg: '修改成功',
    };
    return result;
  }

  // 删除配置信息
  @ApiOperation({ summary: '删除配置信息' })
  @Delete(':id')
  @ApiParam({
    name: 'id',
    description: '这是配置id',
  })
  async deleteConfig(@Param('id') id: number): Promise<IHttpData> {
    this.configService.delete(id);
    const result: IHttpData = {
      code: 0,
      data: null,
      msg: '删除成功',
    };
    return result;
  }
}
