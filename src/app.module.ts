/*
 * @Descriptin:
 * @Version: 0.1
 * @Autor: boide gui
 * @Date: 2020-12-30 12:08:32
 * @LastEditors: boide gui
 * @LastEditTime: 2021-01-06 18:39:00
 */
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
// 子模块加载
import { UserModule } from './server/user/user.module';
import { UploadModule } from './server/upload/upload.module';
import { ConfigModule } from './server/config/config.module';
@Module({
  imports: [
    // 加载连接数据库
    TypeOrmModule.forRoot({
      type: 'mysql', // 数据库类型
      host: '106.14.192.46', // 数据库ip地址
      port: 3306, // 端口
      username: 'boide', // 登录名
      password: 'QIji980907*', // 密码
      database: 'boide', // 数据库名称
      entities: [__dirname + '/**/*.entity{.ts,.js}'], // 扫描本项目中.entity.ts或者.entity.js的文件
      synchronize: true, // 定义数据库表结构与实体类字段同步(这里一旦数据库少了字段就会自动加入,根据需要来使用)
    }),
    UserModule,
    UploadModule,
    ConfigModule,
  ],
  controllers: [AppController],
})
export class AppModule {}
