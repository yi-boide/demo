import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import * as moment from 'moment';
import { Repository } from 'typeorm';
import { Problem } from './problem.entity';
import { ProblemDao } from './problem.dao';

@Injectable()
export class ProblemService {
  // 使用InjectRepository装饰器并引入Repository这样就可以使用typeorm的操作了
  constructor(
    @InjectRepository(Problem)
    private readonly problemRepository: Repository<Problem>,
  ) {}

  // 获取所有信息
  async findAll(): Promise<Problem[]> {
    return await this.problemRepository.find();
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
