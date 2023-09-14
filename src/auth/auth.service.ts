import { HttpException, HttpStatus, Injectable, UnauthorizedException } from "@nestjs/common";
import { UserDTO } from "./dto/user.dto";
import { UserService } from "./user.service";
import * as bcrypt from 'bcrypt';
import { Payload } from './security/payload.interface'
import { user } from '../domain/user.entity'
import { JwtService } from '@nestjs/jwt'


@Injectable()
export class AuthService {
  constructor (
      private userService: UserService,
      private jwtService: JwtService
  ) {
  }
  
  async registerNewUser (newUser: UserDTO): Promise<UserDTO> {
    let userFind: UserDTO = await this.userService.findByFields({ where:{ username:newUser.username } });
    if (userFind) {
      throw new HttpException('Username already used!', HttpStatus.BAD_REQUEST);
    }
    
    return this.userService.save(newUser);
  }
  
  async validateUser (userDTO: UserDTO): Promise<{ accessToken: string } | undefined> {
    let userFind: user = await this.userService.findByFields({
      where:{ username:userDTO.username }
    });
    
    const validatePassword = await bcrypt.compare(userDTO.password, userFind.password)
    
    // 로그 추가: 사용자 정보와 데이터베이스 조회 결과를 로그로 출력
    console.log('사용자 정보:', user);
    console.log('데이터베이스 조회 결과:', userFind);
    
    
    if (!userFind || !validatePassword) {
      throw new UnauthorizedException();
    }
    
    this.convertInAuthorities(userFind);
    
    const payload: Payload = {
      id:userFind.id,
      username:userFind.username,
      authorities:userFind.authorities
    };
    
    const accessToken = this.jwtService.sign(payload);
    // 토큰을 찍어보고 싶다면 여기에 콘솔 로그를 추가
    console.log('토큰:', accessToken);
    
    return {
      accessToken:this.jwtService.sign(payload),
    };
    
  }
  
  async tokenValidateUser (payload: Payload): Promise<user | undefined> {
    const userFind = await this.userService.findByFields({
      where: { id: payload.id }
    });
    this.flatAuthorities(userFind);
    return userFind;
  
  }
  
  private flatAuthorities (user: any): user {
    if (user && user.authorities) {
      const authorities: string[] = [];
      user.authorities.forEach(authority => authorities.push(authority.authorityName));
      user.authorities = authorities;
    }
    return user;
  }
  
  private convertInAuthorities (user: any): user {
    if (user && user.authorities) {
      const authorities: any[] = [];
      user.authorities.forEach(authority => authorities.push({ name:authority.authorityName }));
      user.authorities = authorities;
    }
    return user;
  }
}
