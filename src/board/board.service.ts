import _ from 'lodash';
import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Article } from '../domain/article.entity'

@Injectable()
export class BoardService {
  constructor(
      @InjectRepository(Article) private articleRepository: Repository<Article>,
  ) {}
  
  async getArticles() {
    return await this.articleRepository.find({
      where: { deletedAt: null },
      select: ['id', 'title', 'author', 'createdAt'],
    });
  }
  
  async getArticleById(id:number) {
    return await this.articleRepository.findOne({
      where: { id, deletedAt: null },
      select: ['title', 'content', 'author', 'createdAt', 'updatedAt'],
    });
  }
  

  
  createArticle(title: string, content: string, password: number) {
    this.articleRepository.insert({
      author: 'test',
      title,
      content,
      password: password.toString(),
    });
  }
  
  async updateArticle(
      id: number,
      title: string,
      content: string,
      password: number,
  ) {
    
    
    // 위 함수는 deleteArticle 에서도 쓰이기 때문에 따로 메소드화
    await this.verifyPassword(id, password);
    
    this.articleRepository.update(id, { title, content });
  }
  
  async deleteArticle(id: number, password: number) {
    await this.verifyPassword(id, password);
    
    await this.articleRepository.softDelete(id);
  }
  
  private async verifyPassword(id: number, password: number) {
    // 굳이 노출될 필요 없는 메소드는 private하게
    const article = await this.articleRepository.findOne({
      where: { id, deletedAt: null },
      select: ['password'],
    });
    if (_.isNil(article)) {
      throw new NotFoundException('Article not found. id: ' + id);
    }
    if (article.password !== password.toString()) {
      throw new UnauthorizedException(`Password is not corrected. id: ${id}`);
    }
  }
}
