/*
 * @Descriptin: entity
 * @Version: 0.1
 * @Autor: boide gui
 * @Date: 2020-12-30 16:51:14
 * @LastEditors: boide gui
 * @LastEditTime: 2021-01-22 14:58:59
 */
import { Column, Entity, PrimaryGeneratedColumn, BaseEntity } from 'typeorm';

@Entity()
export class Custom extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  // 自定义页面标题
  @Column({ type: 'varchar', name: 'title' })
  title: string;

  // 自定义页面描述
  @Column({ type: 'varchar', name: 'describe' })
  describe?: string;

  // 自定义页面描述内容
  @Column({ type: 'longblob', name: 'content' })
  content?: string;

  // 创建时间
  @Column({ type: 'datetime', name: 'create_time' })
  createTime: string;

  // 修改时间
  @Column({ type: 'datetime', default: null, name: 'update_time' })
  updateTime?: string | null;
}
