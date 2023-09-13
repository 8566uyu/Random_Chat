import { Column, Entity, JoinColumn, ManyToOne, PrimaryColumn } from "typeorm";
import { user } from "./user.entity";

@Entity('user_authority')
export class UserAuthority {
  @PrimaryColumn()
  id: number;
  
  @Column('int',{name: 'user_id'})
  userId: number;
  
  @Column('varchar',{name: 'authority_name'})
  authorityName: string;
  
  @ManyToOne(type=>user, user=>user.authorities)
  @JoinColumn({name: 'user_id'})
  user: user;
}
