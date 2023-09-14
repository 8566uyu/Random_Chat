import { Body, Controller, Get, Post, Render, Req, Res, UseGuards, UsePipes, ValidationPipe } from "@nestjs/common";
import { Response, Request } from 'express';
import { AuthService } from "./auth.service";
import { UserDTO } from "./dto/user.dto";
import { AuthGuard } from '@nestjs/passport'
import { RolesGuard } from './security/roles.guard'
import { RoleType } from './role-type'
import { Roles } from './decorator/role.decorator'

@Controller('api')
export class AuthController {
  constructor (private authService: AuthService) {
  }
  
  @Get('register') // 회원가입 페이지 렌더링
  @Render('register')
  getRegisterPage() {
    return {};
  }
  
  @Post('/register')
  @UsePipes(ValidationPipe)
  async registerAccount (@Body() userDTO: UserDTO): Promise<any> {
    return await this.authService.registerNewUser(userDTO);
  }
  
  
  
  @Get('login') // GET 요청에 대한 라우트를 추가
  @Render('login') // login.ejs 템플릿을 렌더링합니다. (실제 템플릿 엔진 및 경로에 따라 수정 필요)
  getLoginPage() {
    return {};
  }
  
  @Post('/login')
  async login (@Body() userDTO: UserDTO, @Res() res: Response): Promise<any> {
    const jwt = await this.authService.validateUser(userDTO);
    res.setHeader('Authorization', 'Bearer ' + jwt.accessToken);
    res.cookie('jwt',jwt.accessToken,{
      httpOnly: true,
      maxAge: 24 * 60 * 60 * 1000, //1 day
      sameSite: 'strict', // 적절한 SameSite 설정
      secure: true, // HTTPS에서만 쿠키 전송
    });
    return res.send({
      message: 'success'
    });
  }
  
  @Post('/logout')
  logout(@Req() req: Request, @Res() res: Response): any {
    // 클라이언트의 jwt 쿠키를 삭제합니다.
    res.clearCookie('jwt', {
      httpOnly: true,
      secure: true, // HTTPS에서만 쿠키 삭제
      sameSite: 'strict', // 적절한 SameSite 설정
    }); // 쿠키 이름을 'jwt'로 가정합니다.
    console.log('로그아웃 요청이 왔습니다.'); // 이 부분을 추가하여 로그
    return res.send({
      message: '로그아웃 성공',
    });
  }
  
  @Get('/cookies')
  getCookies(@Req() req: Request, @Res() res: Response): any {
    const jwt =  req.cookies['jwt'];
    return res.send(jwt);
    
  }
  
  
  @Get('/authenticate')
  @UseGuards(AuthGuard('jwt'))
  isAuthenticated(@Req() req: Request): any {
    const user: any = req.user;
    return user;
  }
  
  @Get('/admin-role')
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Roles(RoleType.ADMIN)
  adminRole(@Req() req: Request): any {
    const user: any = req.user;
    return user;
  }
  
 
  
  // @Post('/logout')
  // logout(@Req() req: Request, @Res() res: Response): any {
  //   res.cookie('jwt', '', {
  //     maxAge: 0
  //   })
  //   return res.send({
  //     message: 'success'
  //   })
  // }
  
}







// 로그인하기
// @Controller()
// export class LoginController {
//
//   @Get('login') // GET 요청에 대한 라우트를 추가
//   @Render('login') // login.ejs 템플릿을 렌더링합니다.
//   getLoginPage () {
//     return {};
//   }

  // @Post() // POST 요청을 처리하는 라우트를 추가
  // async loginPost (@Req() req: Request, @Res() res: Response) {
  //   // 로그인 로직을 여기에 추가
  //   // 사용자가 제출한 아이디와 비밀번호를 검증하고 세션을 설정하거나 인증 토큰을 생성하는 작업을 수행합니다.
  //   // 실제 코드를 추가하세요.
  //
  //
  //   const redirectUrl = '/c_index';
  //   return res.redirect(redirectUrl); // 리디렉션
  // }
  
  // @Post() // POST 요청을 처리하는 라우트를 추가
  // async loginPost(@Req() req: Request, @Res() res: Response, @Body() userDTO: UserDTO) {
  //
  //   const jwt = await this.authService.validateUser(userDTO);
  //
  //   res.setHeader('Authorization', 'Bearer ' + jwt.accessToken);
  //   res.cookie('jwt', jwt.accessToken, {
  //     httpOnly: true,
  //     maxAge: 24 * 60 * 60 * 1000, // 1 day
  //   });
  //
  //   const redirectUrl = '/c_index';
  //   return res.redirect(redirectUrl); // 리디렉션
  // }
  

// }


// 회원가입하기
// @Controller('c_register')
// export class RegisterController {
//   @Get()
//   @Render('c_register') // register.ejs 템플릿을 렌더링합니다.
//   getRegisterPage () {
//     return {};
//   }
 
    // @Post('/logout')
    // logout(@Req() req: Request, @Res() res: Response): any {
    //   res.cookie('jwt', '', {
    //     maxAge: 0
    //   })
    //   return res.send({
    //     message: 'success'
    //   })
    // }
  
// }
