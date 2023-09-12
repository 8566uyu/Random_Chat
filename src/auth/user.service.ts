import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { FindOneOptions, Repository } from "typeorm";
import { UserDTO } from "./dto/user.dto";
// import { User } from "./user.repository";
import { user } from "./entity/user.entity"


@Injectable()
export class UserService{
  constructor(@InjectRepository(user) private userRepository: Repository<user>){} // Repository<user>로 수정
  
  async findByFields(options: FindOneOptions<UserDTO>): Promise<UserDTO | undefined> {
    return await this.userRepository.findOne(options);
  }
  
  async save(userDTO: UserDTO): Promise<UserDTO | undefined> {
    return await this.userRepository.save(userDTO);
  }
}
