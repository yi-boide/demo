/*
 * @Descriptin: 
 * @Version: 0.1
 * @Autor: boide gui
 * @Date: 2020-12-30 16:11:01
 * @LastEditors: boide gui
 * @LastEditTime: 2020-12-30 17:13:07
 */
import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from './user.entity';

@Module({
  imports:[TypeOrmModule.forFeature([UserEntity])],
  controllers: [UserController],
  providers: [UserService]
})
export class UserModule {}
