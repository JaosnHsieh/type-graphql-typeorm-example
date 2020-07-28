import { Entity, PrimaryGeneratedColumn, Column, BaseEntity } from 'typeorm';
import { ExtraBaseEntity } from './ExtraBaseEntity';

@Entity()
export class User extends ExtraBaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @Column()
  age: number;
}
