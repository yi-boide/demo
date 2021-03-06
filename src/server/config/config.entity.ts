/*
 * @Descriptin: entity
 * @Version: 0.1
 * @Autor: boide gui
 * @Date: 2020-12-30 16:51:14
 * @LastEditors: boide gui
 * @LastEditTime: 2021-01-11 10:00:31
 */
import { Column, Entity, PrimaryGeneratedColumn, BaseEntity } from 'typeorm';

@Entity()
export class Config extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  // 部署的网站名称
  @Column({ type: 'varchar', name: 'website_name' })
  websiteName: string;

  // 网站logo
  @Column({ type: 'varchar', name: 'logo' })
  logo?: string;

  // 网站公告
  @Column({ type: 'varchar', name: 'notice' })
  notice: string;

  // 网站描述
  @Column({ type: 'varchar', name: 'describe' })
  describe: string;

  // icp备案号
  @Column({ type: 'varchar', name: 'icp' })
  icp: string;

  // 联系电话
  @Column({ type: 'varchar', name: 'phone' })
  phone: string;

  // 联系我们外链
  @Column({ type: 'varchar', name: 'about' })
  about: string;

  // 创建时间
  @Column({ type: 'datetime', name: 'create_time' })
  createTime: string;

  // 修改时间
  @Column({ type: 'datetime', default: null, name: 'update_time' })
  updateTime?: string | null;
}
