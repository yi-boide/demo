/*
 * @Descriptin:
 * @Version: 0.1
 * @Autor: boide gui
 * @Date: 2021-01-15 17:21:47
 * @LastEditors: boide gui
 * @LastEditTime: 2021-01-18 16:31:59
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
import { ProblemService } from './problem.service';
import {
  ApiTags,
  ApiParam,
  ApiQuery,
  ApiBody,
  ApiOperation,
  ApiResponse,
} from '@nestjs/swagger';
import { IHttpData, Relust } from '../../utils/relust';
import { ProblemDao } from './problem.dao';

@ApiTags('常见问题接口')
@Controller('problem')
export class ProblemController {
  constructor(private readonly problemService: ProblemService) {}

  @ApiOperation({ summary: '查询所有常见问题信息' })
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
    type: ProblemDao
  })
  async findAll(
    @Query('pageNum') pageNum?: string,
    @Query('pageSize') pageSize?: string,
    @Query('title') title?: string,
  ): Promise<IHttpData> {
    const data: any = await this.problemService.findAll(
      parseInt(pageNum),
      parseInt(pageSize),
      title,
    );
    return new Relust(data, 0, '获取成功');
  }

  @ApiOperation({ summary: '根据id查询常见问题信息' })
  @Get(':id')
  @ApiParam({
    name: 'id',
    description: '这是id',
  })
  async getById(@Param('id') id?: number): Promise<IHttpData> {
    const data: any = await this.problemService.getById(id);
    return new Relust(data, 0, '获取成功');
  }

  @ApiOperation({ summary: '新增常见问题信息' })
  @Post('add')
  @ApiBody({ type: ProblemDao })
  async addProblem(@Body() problemDao: ProblemDao): Promise<IHttpData> {
    this.problemService.add(problemDao);
    return new Relust(null, 0, '新增成功');
  }

  @ApiOperation({ summary: '修改常见问题信息' })
  @Post('update')
  async updateProblem(@Body() problemDao: ProblemDao): Promise<IHttpData> {
    this.problemService.update(problemDao);
    return new Relust(null, 0, '修改成功');
  }

  @ApiOperation({ summary: '删除常见问题信息' })
  @Delete(':id')
  @ApiParam({
    name: 'id',
    description: '这是id',
  })
  async deleteProblem(@Param('id') id: number): Promise<IHttpData> {
    this.problemService.delete(id);
    return new Relust(null, 0, '删除成功');
  }
}
