// import { Module } from '@nestjs/common';
// import { TypeOrmModule } from '@nestjs/typeorm';
// import { AuthController } from './auth.controller';
// import { AuthService } from './auth.service';
// import { UserRepository } from './user.repository';
// import { UserService } from './user.service';
//
// @Module({
//   imports: [TypeOrmModule.forFeature([UserRepository])],
//   exports: [TypeOrmModule],
//   controllers: [AuthController],
//   providers: [AuthService, UserService]
// })
// export class AuthModule {}

import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { UserService } from './user.service';
import { user } from '../domain/user.entity'
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport'
import { JwtStrategy } from './security/passport.jwt.strategy'
import { UserAuthority } from '../domain/user-authority.entity'

@Module({
  imports: [TypeOrmModule.forFeature([user,UserAuthority]),
    JwtModule.register({
      secret: 'SECRET_KEY',
      signOptions: { expiresIn: '300s' },
    }),
    PassportModule
  ],
  exports: [TypeOrmModule],
  controllers: [AuthController],
  providers: [AuthService, UserService, JwtStrategy]
})
export class AuthModule {}
