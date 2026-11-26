import { Entity, PrimaryGeneratedColumn, Column, OneToMany, CreateDateColumn } from 'typeorm';
import { Property } from '../properties/property.entity';
import { Inquiry } from '../inquiries/inquiry.entity';
export enum UserRole { ADMIN = 'Admin', AGENT = 'Agent', CLIENT = 'Client' }
@Entity('users')
export class User {
  @PrimaryGeneratedColumn({ name: 'UserID' }) UserID: number;
  @Column({ name: 'FullName', length: 120 }) FullName: string;
  @Column({ name: 'Email', unique: true, length: 190 }) Email: string;
  @Column({ name: 'Password', select: false, length: 255 }) Password: string;
  @Column({ name: 'Role', type: 'enum', enum: UserRole, default: UserRole.CLIENT }) Role: UserRole;
  @CreateDateColumn({ name: 'CreatedAt' }) CreatedAt: Date;
  @OneToMany(() => Property, p => p.owner) properties: Property[];
  @OneToMany(() => Inquiry, i => i.user) inquiries: Inquiry[];
}
