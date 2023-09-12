import { EntityRepository, Repository } from "typeorm";
import { user } from "./entity/user.entity";

@EntityRepository(user)
export class UserRepository extends Repository<user>{}
