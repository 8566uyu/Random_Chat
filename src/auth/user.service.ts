import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { FindOneOptions, Repository } from "typeorm";
import { UserDTO } from "./dto/user.dto";
// import { User } from "./user.repository";
import { user } from "../domain/user.entity"
import * as bcrypt from 'bcrypt';


@Injectable()
export class UserService{
  constructor(@InjectRepository(user) private userRepository: Repository<user>){} // Repository<user>로 수정
  
  async findByFields(options: FindOneOptions<UserDTO>): Promise<user | undefined> {
    return await this.userRepository.findOne(options);
  }
  
  async save(userDTO: UserDTO): Promise<UserDTO | undefined> {
    await this.transformPassword(userDTO);
    console.log(userDTO);
    return await this.userRepository.save(userDTO);
  }
  
  async transformPassword(user: UserDTO): Promise<void> {
    user.password = await bcrypt.hash(
        user.password, 10,
    );
    return Promise.resolve();
  }
  
}
