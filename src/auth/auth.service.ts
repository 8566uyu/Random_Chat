import { HttpException, HttpStatus, Injectable, UnauthorizedException } from "@nestjs/common";
import { UserDTO } from "./dto/user.dto";
import { UserService } from "./user.service";
import * as bcrypt from 'bcrypt';


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

  async validateUser(userDTO: UserDTO): Promise<UserDTO | undefined> {
    let userFind: UserDTO = await this.userService.findByFields({
      where: { username: userDTO.username }
    });
    
    const validatePassword = await bcrypt.compare(userDTO.password, userFind.password)
    
    // 로그 추가: 사용자 정보와 데이터베이스 조회 결과를 로그로 출력
    // console.log('사용자 정보:', user);
    // console.log('데이터베이스 조회 결과:', userFind);
    
    if(!userFind ||  !validatePassword) {
      throw new UnauthorizedException();
    }
    return userFind;
  }
  
}
