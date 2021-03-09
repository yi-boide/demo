export default {
  type: 'mysql', // 数据库类型
  host: '106.14.192.46', // 数据库ip地址
  port: 3306, // 端口
  username: 'boide', // 登录名
  password: 'QIji980907*', // 密码
  database: 'boide', // 数据库名称
  entities: [__dirname + '/**/*.entity{.ts,.js}'], // 扫描本项目中.entity.ts或者.entity.js的文件
  synchronize: true, // 定义数据库表结构与实体类字段同步(这里一旦数据库少了字段就会自动加入,根据需要来使用)
};
