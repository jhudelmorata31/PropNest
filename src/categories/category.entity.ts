import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Property } from '../properties/property.entity';
@Entity('categories')
export class Category {
  @PrimaryGeneratedColumn({ name: 'CategoryID' }) CategoryID: number;
  @Column({ name: 'CategoryName', unique: true, length: 100 }) CategoryName: string;
  @OneToMany(() => Property, p => p.category) properties: Property[];
}
