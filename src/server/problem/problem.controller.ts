/*
 * @Descriptin:
 * @Version: 0.1
 * @Autor: boide gui
 * @Date: 2021-01-15 17:21:47
 * @LastEditors: boide gui
 * @LastEditTime: 2021-01-15 18:14:52
 */
import { Controller, Get, Post, Delete, Body, Param } from '@nestjs/common';
import { ProblemService } from './problem.service';
import { ApiTags, ApiParam, ApiBody, ApiOperation } from '@nestjs/swagger';
import { IHttpData } from '../../utils/relust';
import { ProblemDao } from './problem.dao';

@ApiTags('常见问题接口')
@Controller('problem')
export class ProblemController {
  constructor(private readonly problemService: ProblemService) {}

  @ApiOperation({ summary: '查询所有常见问题信息' })
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
    const data: any = await this.problemService.findAll(pageNum, pageSize);
    const result: IHttpData = {
      code: 0,
      data,
      msg: '获取成功',
    };
    return result;
  }

  @ApiOperation({ summary: '根据id查询常见问题信息' })
  @Get(':id')
  @ApiParam({
    name: 'id',
    description: '这是id',
  })
  async getById(@Param('id') id?: number): Promise<IHttpData> {
    const data: any = await this.problemService.getById(id);
    const result: IHttpData = {
      code: 0,
      data,
      msg: '获取成功',
    };
    return result;
  }

  @ApiOperation({ summary: '新增常见问题信息' })
  @Post('add')
  @ApiBody({ type: ProblemDao })
  async addProblem(@Body() problemDao: ProblemDao): Promise<IHttpData> {
    this.problemService.add(problemDao);
    const result: IHttpData = {
      code: 0,
      data: null,
      msg: '新增成功',
    };
    return result;
  }

  @ApiOperation({ summary: '修改常见问题信息' })
  @Post('update')
  async updateProblem(@Body() problemDao: ProblemDao): Promise<IHttpData> {
    this.problemService.update(problemDao);
    const result: IHttpData = {
      code: 0,
      data: null,
      msg: '修改成功',
    };
    return result;
  }

  @ApiOperation({ summary: '删除常见问题信息' })
  @Delete(':id')
  @ApiParam({
    name: 'id',
    description: '这是id',
  })
  async deleteProblem(@Param('id') id: number): Promise<IHttpData> {
    this.problemService.delete(id);
    const result: IHttpData = {
      code: 0,
      data: null,
      msg: '删除成功',
    };
    return result;
  }
}
