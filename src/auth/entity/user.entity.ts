import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity('user')
export class user{
  @PrimaryGeneratedColumn()
  id: number;
  
  @Column()
  username: string;
  
  @Column()
  password: string;
}
