/*
 * @Descriptin:
 * @Version: 0.1
 * @Autor: boide gui
 * @Date: 2021-01-07 11:13:36
 * @LastEditors: boide gui
 * @LastEditTime: 2021-01-15 18:13:39
 */
/*
 * @Descriptin:
 * @Version: 0.1
 * @Autor: boide gui
 * @Date: 2021-01-06 11:43:52
 * @LastEditors: boide gui
 * @LastEditTime: 2021-01-11 10:02:40
 */
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import * as moment from 'moment';
import { Repository } from 'typeorm';
import { Config } from './config.entity';
import { ConfigDao } from './config.dao';
import { ICommonListContainer } from '../../utils/relust';
@Injectable()
export class ConfigService {
  // 使用InjectRepository装饰器并引入Repository这样就可以使用typeorm的操作了
  constructor(
    @InjectRepository(Config)
    private readonly configRepository: Repository<Config>,
  ) {}

  // 获取所有配置信息
  async findAll(pageNum = 1, pageSize = 10): Promise<ICommonListContainer> {
    let qb = this.configRepository.createQueryBuilder('config');
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

  // 根据管理id查询配置信息， 默认1
  async getById(id = 1) {
    return await this.configRepository.findOne(id);
  }

  // 创建配置信息
  async add(data: ConfigDao) {
    const configData = new Config();
    configData.websiteName = data.websiteName;
    configData.logo = data.logo;
    configData.notice = data.notice;
    configData.about = data.about;
    configData.describe = data.describe;
    configData.phone = data.phone;
    configData.icp = data.icp;
    configData.createTime = moment(new Date()).format('YYYY-MM-DD HH:mm:ss');
    this.configRepository.save(configData);
  }

  // 修改配置信息
  async update(data: ConfigDao) {
    const configData = await this.getById(data.id);
    configData.websiteName = data.websiteName;
    configData.logo = data.logo;
    configData.notice = data.notice;
    configData.about = data.about;
    configData.describe = data.describe;
    configData.phone = data.phone;
    configData.icp = data.icp;
    configData.updateTime = moment(new Date()).format('YYYY-MM-DD HH:mm:ss');
    this.configRepository.save(configData);
  }

  // 删除配置信息
  async delete(id = 1) {
    const configData = await this.configRepository.findOne(id);
    this.configRepository.remove(configData);
  }
}
