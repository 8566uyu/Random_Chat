import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Chat {
  @PrimaryGeneratedColumn()
  id: string;
  
  @Column()
  pw: string;
  
  @Column({ default: true })
  isActive: boolean;
}
