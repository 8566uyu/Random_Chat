import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Community {
  @PrimaryGeneratedColumn()
  id: number;
  
  @Column()
  pw: string;
  
  @Column({ default: true })
  isActive: boolean;
}
