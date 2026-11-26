import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany, JoinColumn, CreateDateColumn, UpdateDateColumn, Index } from 'typeorm';
import { User } from '../users/user.entity';
import { Category } from '../categories/category.entity';
import { Inquiry } from '../inquiries/inquiry.entity';
import { PropertyImage } from '../images/property-image.entity';
export enum PropertyStatus { AVAILABLE = 'Available', PENDING = 'Pending', SOLD = 'Sold', RENTED = 'Rented' }
@Entity('properties')
@Index(['Location'])
export class Property {
  @PrimaryGeneratedColumn({ name: 'PropertyID' }) PropertyID: number;
  @Column({ name: 'UserID' }) UserID: number;
  @Column({ name: 'CategoryID' }) CategoryID: number;
  @Column({ name: 'Title', length: 180 }) Title: string;
  @Column({ name: 'Location', length: 255 }) Location: string;
  @Column({ name: 'Price', type: 'decimal', precision: 13, scale: 2 }) Price: string;
  @Column({ name: 'Status', type: 'enum', enum: PropertyStatus, default: PropertyStatus.AVAILABLE }) Status: PropertyStatus;
  @CreateDateColumn({ name: 'CreatedAt' }) CreatedAt: Date;
  @UpdateDateColumn({ name: 'UpdatedAt' }) UpdatedAt: Date;
  @ManyToOne(() => User, u => u.properties, { onDelete: 'RESTRICT' }) @JoinColumn({ name: 'UserID' }) owner: User;
  @ManyToOne(() => Category, c => c.properties, { onDelete: 'RESTRICT' }) @JoinColumn({ name: 'CategoryID' }) category: Category;
  @OneToMany(() => Inquiry, i => i.property) inquiries: Inquiry[];
  @OneToMany(() => PropertyImage, i => i.property, { cascade: true }) images: PropertyImage[];
}
