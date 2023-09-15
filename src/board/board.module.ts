import { Module } from '@nestjs/common';
import { BoardController } from './board.controller';
import { BoardService } from './board.service';
import { TypeOrmModule } from '@nestjs/typeorm'
import { Article } from '../domain/article.entity'

@Module({
  imports: [TypeOrmModule.forFeature([Article])],
  controllers: [BoardController],
  providers: [BoardService],
})
export  class BoardModule {}
