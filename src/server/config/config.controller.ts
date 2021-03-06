/*
 * @Descriptin:
 * @Version: 0.1
 * @Autor: boide gui
 * @Date: 2021-01-08 11:38:21
 * @LastEditors: boide gui
 * @LastEditTime: 2021-01-18 16:34:05
 */
/*
 * @Descriptin:
 * @Version: 0.1
 * @Autor: boide gui
 * @Date: 2021-01-06 11:43:22
 * @LastEditors: boide gui
 * @LastEditTime: 2021-01-08 10:42:58
 */
import {
  Controller,
  Get,
  Post,
  Delete,
  Body,
  Param,
  Query,
} from '@nestjs/common';
import { ConfigService } from './config.service';
import {
  ApiTags,
  ApiParam,
  ApiQuery,
  ApiBody,
  ApiOperation,
  ApiResponse,
} from '@nestjs/swagger';
import { IHttpData, Relust } from '../../utils/relust';
import { ConfigDao } from './config.dao';

@ApiTags('配置接口')
@Controller('config')
export class ConfigController {
  constructor(private readonly configService: ConfigService) {}

  // 查询所有配置信息
  @ApiOperation({ summary: '查询所有配置信息' })
  @Get('list')
  @ApiQuery({
    name: 'pageNum',
    description: '页数',
  })
  @ApiQuery({
    name: 'pageSize',
    description: '一页数量',
  })
  @ApiResponse({
    status: 200,
    description: '查询成功',
    type: [ConfigDao]
  })
  async findAll(
    @Query('pageNum') pageNum?: number,
    @Query('pageSize') pageSize?: number,
  ): Promise<IHttpData> {
    const data: any = await this.configService.findAll(pageNum, pageSize);
    return new Relust(data, 0, '获取成功');
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
    return new Relust(data, 0, '获取成功');
  }

  // 新增配置信息
  @ApiOperation({ summary: '新增配置信息' })
  @Post('add')
  @ApiBody({ type: ConfigDao })
  async addConfig(@Body() configDao: ConfigDao): Promise<IHttpData> {
    this.configService.add(configDao);
    return new Relust(null, 0, '新增成功');
  }

  // 修改配置信息
  @ApiOperation({ summary: '修改配置信息' })
  @Post('update')
  async updateConfig(@Body() configDao: ConfigDao): Promise<IHttpData> {
    this.configService.update(configDao);
    return new Relust(null, 0, '修改成功');
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
    return new Relust(null, 0, '删除成功');
  }
}
