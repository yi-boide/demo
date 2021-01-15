import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import * as moment from 'moment';
import { Repository } from 'typeorm';
import { Custom } from './custom.entity';
import { CustomDao } from './custom.dao';
import { ICommonListContainer } from '../../utils/relust';

@Injectable()
export class CustomService {
  // 使用InjectRepository装饰器并引入Repository这样就可以使用typeorm的操作了
  constructor(
    @InjectRepository(Custom)
    private readonly customRepository: Repository<Custom>,
  ) {}

  // 获取所有信息
  async findAll(
    pageNum = 1,
    pageSize = 10,
    title = null,
  ): Promise<ICommonListContainer> {
    let qb = this.customRepository.createQueryBuilder('custom');
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
    return await this.customRepository.findOne(id);
  }

  // 创建信息
  async add(data: CustomDao) {
    const customData = new Custom();
    customData.title = data.title;
    customData.describe = data.describe;
    customData.content = data.content;
    customData.createTime = moment(new Date()).format('YYYY-MM-DD HH:mm:ss');
    this.customRepository.save(customData);
  }

  // 修改配置信息
  async update(data: CustomDao) {
    const customData = await this.getById(data.id);
    customData.title = data.title;
    customData.describe = data.describe;
    customData.content = data.content;
    customData.updateTime = moment(new Date()).format('YYYY-MM-DD HH:mm:ss');
    this.customRepository.save(customData);
  }

  // 删除配置信息
  async delete(id = 1) {
    const customData = await this.customRepository.findOne(id);
    this.customRepository.remove(customData);
  }
}
