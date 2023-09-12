import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { UserService } from './user.service';
import { user } from './entity/user.entity'

@Module({
  imports: [TypeOrmModule.forFeature([user])],
  exports: [TypeOrmModule],
  controllers: [AuthController],
  providers: [AuthService, UserService]
})
export class AuthModule {}
