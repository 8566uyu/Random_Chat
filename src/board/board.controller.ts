import {
  Body,
  Controller,
  Delete,
  Get,
  Param, ParseIntPipe,
  Post,
  Put, Render,
} from '@nestjs/common';
import { BoardService } from './board.service';
import { CreateArticleDto } from './dto/create-article.dto'
import { UpdateArticleDto } from './dto/update-article.dto'
import { DeleteArticleDto } from './dto/delete-article.dto'



@Controller('board')
export class BoardController {
  
  constructor (private readonly boardService: BoardService) {
  }
  
  // // 게시물 목록을 가져오는
  // @Get('/articles')
  // async getArticles() {
  //   return await this.boardService.getArticles();
  // }
  
  
  // 게시물 목록 조회
  @Get('article-list')
  @Render('article-list') // 게시물 목록을 렌더링하는 템플릿
  async getArticleList () {
    const articles = await this.boardService.getArticles();
    return { articles };
  }
  
  
  // 게시물 상세보기 -> 게시물 ID로 확인
  
  @Get('article-detail/:id')
  @Render('article-detail') // article-detail.ejs 템플릿을 렌더링
  async getArticleById (@Param('id') articleId: number) {
    const article = await this.boardService.getArticleById(articleId);
    return { article };
  }
  
  // @Get('/articles/:id')
  // async getArticleById(@Param('id') articleId: number) {
  //   const article = await this.boardService.getArticleById(articleId);
  //
  //   // 게시글 조회 로그를 추가
  //   // console.log(`Fetched article with ID ${articleId}:`, article);
  //   return await this.boardService.getArticleById(articleId);
  // }
  
  
  @Get('create') // 게시물 작성 페이지를 렌더링
  @Render('article') // article.ejs 템플릿을 렌더링
  createArticlePage () {
    return { formData:{} }; // 필요한 데이터를 전달할 수 있음
  }


// 게시물 작성
  @Post('/create')
  createArticle (@Body() data: CreateArticleDto) {
    console.log('Received data:', data);
    return this.boardService.createArticle(
        data.title,
        data.content,
        data.password
    );
  }
  
  
  // // 게시물 수정
  // @Put('/articles/:id')
  // async updateArticle(
  //     @Param('id') articleId: number,
  //     @Body() data: UpdateArticleDto,
  // ) {
  //   return await this.boardService.updateArticle(
  //       articleId,
  //       data.title,
  //       data.content,
  //       data.password,
  //   );
  // }
  
  
  
  @Put('article-edit/:id')
  async updateArticle (
      @Param('id') articleId: number,
      @Body() data: UpdateArticleDto,
  ) {
    // 게시물을 업데이트하는 로직을 구현합니다.
    return await this.boardService.updateArticle(
        articleId,
        data.title,
        data.content,
        data.password,
    );
  }
  
  
  // 게시물 삭제
  @Delete('/article-detail/:id/delete')
  async deleteArticle(
      @Param('id') articleId: number,
      @Body() data: DeleteArticleDto,
  ) {
    return await this.boardService.deleteArticle(articleId, data.password);
  }
  
  
  
  
  
}
