import { EntityRepository, Repository } from "typeorm";
import { user } from "./entity/user.entity";
import { InjectRepository } from '@nestjs/typeorm'
import { Injectable } from '@nestjs/common'

// @EntityRepository(user)
// export class UserRepository extends Repository<user>{}
@Injectable()
export class UserService {
  constructor(
      @InjectRepository(user)
      private readonly userRepository: Repository<user>,
  ) {}
}
