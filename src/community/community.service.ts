// import { Injectable } from '@nestjs/common';
// import { InjectRepository } from '@nestjs/typeorm';
// import { Repository } from 'typeorm';
// import { Community } from './entity/community.entity';
// import { getConnection } from "typeorm";
//
// @Injectable()
// export class CommunityService {
//   constructor(
//       @InjectRepository(Community)
//       private communityRepository: Repository<Community>,
//   ) {}
//
//   findAll(): Promise<Community[]> {
//     return this.communityRepository.find();
//   }
//
//   findOne(id: any): Promise<Community> {
//     return this.communityRepository.findOne(id);
//   }
//
//   async create(chat: Community): Promise<void> {
//     await this.communityRepository.save(chat);
//   }
//
//   async remove(id: number): Promise<void> {
//     await this.communityRepository.delete(id);
//   }
//
//   async update(id: any, Community: Community): Promise<void> {
//     const existChat = await this.communityRepository.findOne(id);
//     if(existChat){
//       await getConnection()
//       .createQueryBuilder()
//       .update(Community)
//       .set({
//         id: Community.id,
//         pw: Community.pw
//       })
//       .where("id = :id", { id })
//       .execute();
//     }
//   }
// }
