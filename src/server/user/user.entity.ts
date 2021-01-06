/*
 * @Descriptin: entity
 * @Version: 0.1
 * @Autor: boide gui
 * @Date: 2020-12-30 16:51:14
 * @LastEditors: boide gui
 * @LastEditTime: 2021-01-06 13:26:57
 */
import { Column, Entity, PrimaryGeneratedColumn, BaseEntity } from 'typeorm';

@Entity()
export class UserEntity extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', name: 'name' })
  name: string;

  @Column({ type: 'varchar', name: 'phone' })
  phone?: string;

  @Column({ type: 'int', name: 'sex' })
  sex: number;

  @Column({ type: 'date', name: 'create_time' })
  createTime: Date;

  @Column({ type: 'date', default: null, name: 'update_time' })
  updateTime?: Date;
}
