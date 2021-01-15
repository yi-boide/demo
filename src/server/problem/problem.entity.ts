/*
 * @Descriptin: entity
 * @Version: 0.1
 * @Autor: boide gui
 * @Date: 2020-12-30 16:51:14
 * @LastEditors: boide gui
 * @LastEditTime: 2021-01-15 20:19:35
 */
import { Column, Entity, PrimaryGeneratedColumn, BaseEntity } from 'typeorm';

@Entity()
export class Problem extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  // 常见问题标题
  @Column({ type: 'varchar', name: 'title' })
  title: string;

  // 常见问题描述
  @Column({ type: 'varchar', name: 'describe' })
  describe?: string;

  // 常见问题描述内容
  @Column({ type: 'text', name: 'content' })
  content?: string;

  // 创建时间
  @Column({ type: 'datetime', name: 'create_time' })
  createTime: string;

  // 修改时间
  @Column({ type: 'datetime', default: null, name: 'update_time' })
  updateTime?: string | null;
}
