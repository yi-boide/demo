import {
  Controller,
  Get,
  Post,
  Delete,
  Body,
  Param,
  Query,
} from '@nestjs/common';
import { CustomService } from './custom.service';
import {
  ApiTags,
  ApiParam,
  ApiQuery,
  ApiBody,
  ApiOperation,
  ApiResponse,
} from '@nestjs/swagger';
import { IHttpData, Relust } from '../../utils/relust';
import { CustomDao } from './custom.dao';

@ApiTags('自定义页面接口')
@Controller('custom')
export class CustomController {
  constructor(private readonly customService: CustomService) {}

  @ApiOperation({ summary: '查询所有自定义页面信息' })
  @Get('list')
  @ApiQuery({
    name: 'pageNum',
    description: '页数',
  })
  @ApiQuery({
    name: 'pageSize',
    description: '一页数量',
  })
  @ApiQuery({
    required: false,
    name: 'title',
    description: '标题',
  })
  @ApiResponse({
    status: 200,
    description: '查询成功',
    type: CustomDao
  })
  async findAll(
    @Query('pageNum') pageNum?: string,
    @Query('pageSize') pageSize?: string,
    @Query('title') title?: string,
  ): Promise<IHttpData> {
    const data: any = await this.customService.findAll(
      parseInt(pageNum),
      parseInt(pageSize),
      title,
    );
    return new Relust(data, 0, '获取成功');
  }

  @ApiOperation({ summary: '根据id查询自定义页面信息' })
  @Get(':id')
  @ApiParam({
    name: 'id',
    description: '这是id',
  })
  async getById(@Param('id') id?: number): Promise<IHttpData> {
    const data: any = await this.customService.getById(id);
    return new Relust(data, 0, '获取成功');
  }

  @ApiOperation({ summary: '新增自定义页面信息' })
  @Post('add')
  @ApiBody({ type: CustomDao })
  async addCustom(@Body() customDao: CustomDao): Promise<IHttpData> {
    this.customService.add(customDao);
    return new Relust(null, 0, '新增成功');
  }

  @ApiOperation({ summary: '修改自定义页面信息' })
  @Post('update')
  async updateCustom(@Body() customDao: CustomDao): Promise<IHttpData> {
    this.customService.update(customDao);
    return new Relust(null, 0, '修改成功');
  }

  @ApiOperation({ summary: '删除自定义页面信息' })
  @Delete(':id')
  @ApiParam({
    name: 'id',
    description: '这是id',
  })
  async deleteCustom(@Param('id') id: number): Promise<IHttpData> {
    this.customService.delete(id);
    return new Relust(null, 0, '删除成功');
  }
}
