import { Body, Controller, Delete, Get, Param, Post, Put, Render, Req, Res } from '@nestjs/common';
import { Request, Response } from 'express';
// import * as bcrypt from 'bcrypt';


@Controller('c_index')
export class CommunityController {
  @Get()
  @Render('c_index') // 커뮤니티 페이지 템플릿을 렌더링
  async getCommunityPage () {
    try {
      // 게시물 목록 데이터를 어딘가에서 가져와서 posts 변수에 할당
      const posts = await this.getPostsFromDatabase(); // 실제 데이터 가져오는 로직
      
      // posts 변수와 user 변수를 템플릿으로 전달
      return { posts };
    } catch (error) {
      console.error(error);
      return { posts:[] }; // 오류 발생 시 빈 배열과 null 반환
    }
  }
  
  // 게시물 목록을 가져오는 메서드
  async getPostsFromDatabase () {
    // 실제 데이터베이스에서 게시물 목록을 가져오는 로직을 작성
    // 예시 데이터를 반환하거나 데이터베이스와 통합하는 코드를 작성
    return [
      {
        title:'게시물 1',
        content:'게시물 내용 1'
      },
      {
        title:'게시물 2',
        content:'게시물 내용 2'
      },
      // 여기에 실제 데이터를 반환하거나 가져오는 코드를 추가
    ];
  }
  
  // constructor(private communityService: CommunityService){};
  //
  // @Get()
  // async findAll(): Promise<Community[]> {
  //   return this.communityService.findAll();
  // }
  //
  // @Get(':id')
  // findOne(@Param('id') id: number): Promise<Community | undefined> {
  //   return this.communityService.findOne(id);
  // }
  //
  // @Get()
  // findAll(): Promise<Community[]> {
  //   return this.communityService.findAll();
  // }
  //
  // @Post()
  // create(@Body() community: Community): Promise<Community> {
  //   return this.communityService.create(community);
  // }
  //
  // @Put(':id')
  // update(@Param('id') id: number, @Body() community: Community): Promise<void> {
  //   return this.communityService.update(id, community);
  // }
  //
  // @Delete(':id')
  // remove(@Param('id') id: number): Promise<void> {
  //   return this.communityService.remove(id);
  // }
}


@Controller('c_create')
export class CreateController {
  @Get() // GET 요청에 대한 라우트를 추가
  @Render('c_create') // article.ejs 템플릿을 렌더링합니다.
  getCreatePage() {
    const initialFormData = {
      title: '',       // 초기 제목 설정
      content: '',     // 초기 내용 설정
    };
    return { formData: initialFormData };
  }
  
  @Post() // POST 요청을 처리하는 라우트를 추가
  async createPost(@Req() req: Request, @Res() res: Response) {
    // 게시물 작성 로직을 추가
    // 데이터베이스에 게시물 저장 등의 작업을 수행합니다.
    // 실제 코드를 추가하세요.
    // dkfrpTtmqslek.
    // 작성 완료 후 게시판 페이지로 리디렉션합니다.
    return res.redirect('/c_index'); // 리디렉션
  }
}





