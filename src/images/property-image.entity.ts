import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { Property } from '../properties/property.entity';
@Entity('property_images')
export class PropertyImage {
  @PrimaryGeneratedColumn({ name: 'ImageID' }) ImageID: number;
  @Column({ name: 'PropertyID' }) PropertyID: number;
  @Column({ name: 'ImageURL', length: 2048 }) ImageURL: string;
  @ManyToOne(() => Property, p => p.images, { onDelete: 'CASCADE' }) @JoinColumn({ name: 'PropertyID' }) property: Property;
}
