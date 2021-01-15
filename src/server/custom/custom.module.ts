/*
 * @Descriptin:
 * @Version: 0.1
 * @Autor: boide gui
 * @Date: 2021-01-15 17:07:11
 * @LastEditors: boide gui
 * @LastEditTime: 2021-01-15 17:10:03
 */
import { Module } from '@nestjs/common';
import { CustomController } from './custom.controller';
import { CustomService } from './custom.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Custom } from './custom.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Custom])],
  controllers: [CustomController],
  providers: [CustomService],
})
export class CustomModule {}
