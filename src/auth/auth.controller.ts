import { Body, Controller, Get, Post, Render, Req, Res } from "@nestjs/common";
import { Response, Request } from 'express';
import { AuthService } from "./auth.service";
import { UserDTO } from "./dto/user.dto";

@Controller('api')
export class AuthController {
  constructor(private authService: AuthService){}
  
  @Post('/register')
  async registerAccount(@Req() req: Request, @Body() userDTO: UserDTO): Promise<any> {
    return await this.authService.registerNewUser(userDTO);
  }
  
  @Post('/login')
  async login(@Body() userDTO: UserDTO): Promise<any> {
    return await this.authService.validateUser(userDTO);
  }
}

// 로그인하기
@Controller('c_login')
export class LoginController {
  
  @Get() // GET 요청에 대한 라우트를 추가
  @Render('c_login') // c_login.ejs 템플릿을 렌더링합니다.
  getLoginPage () {
    return {};
  }
  
  @Post() // POST 요청을 처리하는 라우트를 추가
  async loginPost (@Req() req: Request, @Res() res: Response) {
    // 로그인 로직을 여기에 추가
    // 사용자가 제출한 아이디와 비밀번호를 검증하고 세션을 설정하거나 인증 토큰을 생성하는 작업을 수행합니다.
    // 실제 코드를 추가하세요.
    
    
    const redirectUrl = '/c_index';
    return res.redirect(redirectUrl); // 리디렉션
  }
}


// 회원가입하기
@Controller('c_register')
export class RegisterController {
  @Get()
  @Render('c_register') // c_register.ejs 템플릿을 렌더링합니다.
  getRegisterPage() {
    return {};
  }
  
  @Post()
  async registerPost(@Req() req: Request, @Res() res: Response) {
    try {
      // 요청에서 사용자 이름과 비밀번호 가져오기
      const { username, password } = req.body;
      
      // 여기에서 회원가입 로직을 추가합니다.
      // 데이터베이스에 사용자 정보를 저장하거나 기타 필요한 작업을 수행합니다.
      
      // 회원가입이 완료되면 로그인 페이지로 리디렉션합니다.
      return res.redirect('/c_login'); // 로그인 페이지로 리디렉션
    } catch (error) {
      console.error('회원가입 오류:', error);
      return res.render('c_register', { error: '회원가입 중 오류가 발생했습니다.' });
    }
  }
}
