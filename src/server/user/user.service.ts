/*
 * @Descriptin: 
 * @Version: 0.1
 * @Autor: boide gui
 * @Date: 2020-12-30 16:11:29
 * @LastEditors: boide gui
 * @LastEditTime: 2020-12-30 19:09:06
 */
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserEntity } from './user.entity';
import { UserData } from '../../utils/relust'
@Injectable()
export class UserService {
  // 使用InjectRepository装饰器并引入Repository这样就可以使用typeorm的操作了
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
  ) { }

  // 获取所有用户数据列表(userRepository.query()方法属于typeoram)
  async findAll(): Promise<UserEntity[]> {
    return await this.userRepository.find();
  }

  // 创建用户
  async create(data: UserData) {
    let userData = new UserEntity();
    userData.name = data.name
    userData.phone = data.phone
    userData.sex = data.sex
    userData.createTime = new Date()
    this.userRepository.save(userData);
  }

  // 修改用户
  async update(data: UserData) {
    let userData = await this.userRepository.findOne(data.id);
    userData.name = data.name
    userData.phone = data.phone
    userData.sex = data.sex
    userData.updateTime = new Date()
    this.userRepository.save(userData);
  }

  // 根据用户id查询用户
  async getById(id: number) {
    return await this.userRepository.findOne(id);
  }

  // 删除用户
  async delete(id: number) {
    let userData = await this.userRepository.findOne(id);
    this.userRepository.remove(userData);
  }
}
