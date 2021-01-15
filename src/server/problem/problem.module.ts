/*
 * @Descriptin:
 * @Version: 0.1
 * @Autor: boide gui
 * @Date: 2021-01-15 17:21:06
 * @LastEditors: boide gui
 * @LastEditTime: 2021-01-15 17:31:15
 */
import { Module } from '@nestjs/common';
import { ProblemService } from './problem.service';
import { ProblemController } from './problem.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Problem } from './problem.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Problem])],
  providers: [ProblemService],
  controllers: [ProblemController],
})
export class ProblemModule {}
