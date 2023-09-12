import { Module } from '@nestjs/common';
import { ChatBackEndModule } from './chatBackEnd/chatBackEnd.module';
import { ChatFrontEndModule } from './chatFrontEnd/chatFrontEnd.module';
import { CommunityController, CreateController } from './community/community.controller';
import { TypeOrmModule } from '@nestjs/typeorm'
import { Community } from './community/entity/community.entity'
import { AuthModule } from './auth/auth.module';
import { user } from './auth/entity/user.entity'
import { AuthController } from './auth/auth.controller'
import { AuthService } from './auth/auth.service'
import { UserService } from './auth/user.service'


@Module({
    imports: [ChatBackEndModule, ChatFrontEndModule,
        TypeOrmModule.forRoot({
            type: 'mysql',
            host: 'localhost',
            port: 3306,
            username: 'root',
            password: '0531',
            database: 'chat',
            entities: [Community, user],
            synchronize: true, //개발모드에서만 사용하기
        }),
        AuthModule],
    controllers: [CommunityController,CreateController],
    
})
export class AppModule {}
