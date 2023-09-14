import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserAuthority } from '../../domain/user-authority.entity'; // User 엔터티의 실제 이름을 사용해야 합니다.

// @EntityRepository(UserAuthority)
// export class UserAuthorityRepository extends Repository<UserAuthority> {}

@Injectable()
export class UserService {
  constructor(
      @InjectRepository(UserAuthority)
      private readonly userRepository: Repository<UserAuthority>,
  ) {}
}
