import { Column, CreateDateColumn, DeleteDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn, } from 'typeorm';

@Entity( 'articles' )
export class Article {
  @PrimaryGeneratedColumn({ type: 'int', name: 'id' })
  id: number;
  
  @Column({ default: '제목 없음' })
  title: string;
  
  @Column('varchar', { length: 1000 })
  content: string;
  
  @Column('varchar', { select: false })
  password: string;
  
  @Column('varchar', { length: 10 })
  author: string;
  
  @CreateDateColumn()
  createdAt: Date;
  
  @UpdateDateColumn()
  updatedAt: Date;
  
  @DeleteDateColumn()
  deletedAt: Date | null;
}
