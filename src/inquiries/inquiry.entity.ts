import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn, CreateDateColumn } from 'typeorm';
import { User } from '../users/user.entity';
import { Property } from '../properties/property.entity';
@Entity('inquiries')
export class Inquiry {
  @PrimaryGeneratedColumn({ name: 'InquiryID' }) InquiryID: number;
  @Column({ name: 'UserID' }) UserID: number;
  @Column({ name: 'PropertyID' }) PropertyID: number;
  @Column({ name: 'Message', type: 'text' }) Message: string;
  @CreateDateColumn({ name: 'InquiryDate' }) InquiryDate: Date;
  @ManyToOne(() => User, u => u.inquiries, { onDelete: 'CASCADE' }) @JoinColumn({ name: 'UserID' }) user: User;
  @ManyToOne(() => Property, p => p.inquiries, { onDelete: 'CASCADE' }) @JoinColumn({ name: 'PropertyID' }) property: Property;
}
