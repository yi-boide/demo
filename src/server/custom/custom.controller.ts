import { Controller, Get, Post, Delete, Body, Param } from '@nestjs/common';
import { CustomService } from './custom.service';
import { ApiTags, ApiParam, ApiBody, ApiOperation } from '@nestjs/swagger';
import { IHttpData } from '../../utils/relust';
import { CustomDao } from './custom.dao';

@ApiTags('自定义页面接口')
@Controller('custom')
export class CustomController {
  constructor(private readonly customService: CustomService) {}

  @ApiOperation({ summary: '查询所有自定义页面信息' })
  @Get('list')
  @ApiParam({
    name: 'pageNum',
    description: '页数',
  })
  @ApiParam({
    name: 'pageSize',
    description: '一页数量',
  })
  async findAll(
    @Param('pageNum') pageNum?: number,
    @Param('pageSize') pageSize?: number,
  ): Promise<IHttpData> {
    const data: any = await this.customService.findAll(pageNum, pageSize);
    const result: IHttpData = {
      code: 0,
      data,
      msg: '获取成功',
    };
    return result;
  }

  @ApiOperation({ summary: '根据id查询自定义页面信息' })
  @Get(':id')
  @ApiParam({
    name: 'id',
    description: '这是id',
  })
  async getById(@Param('id') id?: number): Promise<IHttpData> {
    const data: any = await this.customService.getById(id);
    const result: IHttpData = {
      code: 0,
      data,
      msg: '获取成功',
    };
    return result;
  }

  @ApiOperation({ summary: '新增自定义页面信息' })
  @Post('add')
  @ApiBody({ type: CustomDao })
  async addCustom(@Body() customDao: CustomDao): Promise<IHttpData> {
    this.customService.add(customDao);
    const result: IHttpData = {
      code: 0,
      data: null,
      msg: '新增成功',
    };
    return result;
  }

  @ApiOperation({ summary: '修改自定义页面信息' })
  @Post('update')
  async updateCustom(@Body() customDao: CustomDao): Promise<IHttpData> {
    this.customService.update(customDao);
    const result: IHttpData = {
      code: 0,
      data: null,
      msg: '修改成功',
    };
    return result;
  }

  @ApiOperation({ summary: '删除自定义页面信息' })
  @Delete(':id')
  @ApiParam({
    name: 'id',
    description: '这是id',
  })
  async deleteCustom(@Param('id') id: number): Promise<IHttpData> {
    this.customService.delete(id);
    const result: IHttpData = {
      code: 0,
      data: null,
      msg: '删除成功',
    };
    return result;
  }
}
