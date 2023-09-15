import _ from 'lodash';
import { Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';

@Injectable()
export class BoardService {
  // 원래는 Repository를 참조하여 비지니스 로직을 실행하기 위해 데이터베이스와 통신을 함
  // 하지만, 여기선 편의성을 위하여 인-메모리 변수로 해결
  
  
  private articles = [];
  
  private articlePasswords = new Map();
  
  getArticles() {
    return this.articles;
  }
  
  getArticleById(id) {
    return this.articles.find((article) => {
      return article.id === id;
    });
  }
  
  createArticle(title: string, content: string, password: number) {
    // id를 먼저 매겨야 한다.
    // 1부터 시작 -> 현재 배열의 크기 + 1 ->
    const articleId = this.articles.length + 1;
    this.articles.push({ id: articleId, title, content });
    this.articlePasswords.set(articleId, password);
    return articleId;
  }
  
  updateArticle(id: number, title: string, content: string, password: number)  {
    if (this.articlePasswords.get(id) !== password) {
      throw new UnauthorizedException('Password is not correct. id: ' + id);
      // nest.js에서는 status code와 예외에 대해서 최소한으로 생각할 수 있게
      // 자체적으로 예외를 제공하고 있다.
    }
    
    const article = this.getArticleById(id);
    if (_.isNil(article)) {
      throw new NotFoundException('Article not found. id: ' + id);
    }
    
    article.title = title;
    article.content = content;
  }
  
  deleteArticle(id: number, password: number) {
    if (this.articlePasswords.get(id) !== password) {
      throw new UnauthorizedException('Password is not correct. id: ' + id);
    }
    
    this.articles = this.articles.filter((article) => {
      return article.id !== id;
    })
  }
}
