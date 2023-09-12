import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { UserDTO } from "./dto/user.dto";
import { UserService } from "./user.service";

@Injectable()
export class AuthService {
  constructor(
      private userService: UserService
  ){}
  
  async registerNewUser(newUser: UserDTO): Promise<UserDTO> {
    let userFind: UserDTO = await this.userService.findByFields({ where: { username: newUser.username } });
    if(userFind){
      throw new HttpException('Username already used!', HttpStatus.BAD_REQUEST);
    }
    return this.userService.save(newUser);
  }
}
