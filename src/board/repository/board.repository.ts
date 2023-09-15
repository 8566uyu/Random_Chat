
import { Article } from '../../domain/article.entity'
import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'

@Injectable()
export class UserService {
  constructor(
      @InjectRepository(Article)
      private readonly userRepository: Repository<Article>,
  ) {}
}
