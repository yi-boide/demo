/*
 * @Descriptin: entity
 * @Version: 0.1
 * @Autor: boide gui
 * @Date: 2020-12-30 16:51:14
 * @LastEditors: boide gui
 * @LastEditTime: 2020-12-31 18:51:30
 */
import { Column, Entity, PrimaryGeneratedColumn, BaseEntity } from 'typeorm';

@Entity()
export class Upload extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  path: string;

  @Column({ default: null, name: 'path_local' })
  pathLocal: string;

  @Column({ default: null, name: 'path_url' })
  pathUrl?: string;

  @Column({ default: null })
  size?: number;

  @Column({ default: null })
  type?: string;

  @Column({ type: 'datetime', name: 'create_time' })
  createTime: string;
}
