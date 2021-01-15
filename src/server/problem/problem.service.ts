import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import * as moment from 'moment';
import { Repository } from 'typeorm';
import { Problem } from './problem.entity';
import { ProblemDao } from './problem.dao';
import { ICommonListContainer } from '../../utils/relust';

@Injectable()
export class ProblemService {
  // 使用InjectRepository装饰器并引入Repository这样就可以使用typeorm的操作了
  constructor(
    @InjectRepository(Problem)
    private readonly problemRepository: Repository<Problem>,
  ) {}

  // 获取所有信息
  async findAll(
    pageNum = 1,
    pageSize = 10,
    title = null,
  ): Promise<ICommonListContainer> {
    let qb = this.problemRepository.createQueryBuilder('problem');
    if (title) {
      qb = qb.where(title);
    }
    qb = qb.skip(pageSize * (pageNum - 1)).take(pageSize);
    const total = await qb.getCount();
    const list = await qb.getMany();
    return {
      pageSize,
      pageNum,
      pages: Math.ceil(total / pageSize),
      total,
      list,
    };
  }

  // 根据管理id查询信息， 默认1
  async getById(id = 1) {
    return await this.problemRepository.findOne(id);
  }

  // 创建信息
  async add(data: ProblemDao) {
    const problemData = new Problem();
    problemData.title = data.title;
    problemData.describe = data.describe;
    problemData.content = data.content;
    problemData.createTime = moment(new Date()).format('YYYY-MM-DD HH:mm:ss');
    this.problemRepository.save(problemData);
  }

  // 修改配置信息
  async update(data: ProblemDao) {
    const problemData = await this.getById(data.id);
    problemData.title = data.title;
    problemData.describe = data.describe;
    problemData.content = data.content;
    problemData.updateTime = moment(new Date()).format('YYYY-MM-DD HH:mm:ss');
    this.problemRepository.save(problemData);
  }

  // 删除配置信息
  async delete(id = 1) {
    const problemData = await this.problemRepository.findOne(id);
    this.problemRepository.remove(problemData);
  }
}
