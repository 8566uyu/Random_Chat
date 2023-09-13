import { Module } from '@nestjs/common';
import { ChatBackEndModule } from './chatBackEnd/chatBackEnd.module';
import { ChatFrontEndModule } from './chatFrontEnd/chatFrontEnd.module';
import {
    CommunityController,
    CreateController
} from './community/community.controller';
import { LoginController,
    RegisterController } from './auth/auth.controller'
import { TypeOrmModule } from '@nestjs/typeorm'
import { Community } from './community/entity/community.entity'
import { AuthModule } from './auth/auth.module';
import { user } from './auth/entity/user.entity'
import { createConnection } from 'mysql2'



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
            // entities: ["src/bar/entity/**/*.ts", user],
            synchronize: true, //개발모드에서만 사용하기
        }),
        AuthModule],
    controllers: [CommunityController,CreateController,LoginController,RegisterController],

})
export class AppModule {}


// @Module({
//     imports: [ChatBackEndModule, ChatFrontEndModule, AuthModule],
//     controllers: [CommunityController, CreateController],
// })
// export class AppModule {
//     constructor() {
//         this.connectToDatabase();
//     }
//
//     private async connectToDatabase() {
//         try {
//             const connectionOptions = {
//                 type: 'mysql',
//                 host: 'localhost',
//                 port: 3306,
//                 username: 'root',
//                 password: '0531',
//                 database: 'chat',
//                 synchronize: true,
//                 entities: [ Community, user],
//             };
//             const connection = await createConnection(connectionOptions);
//             console.log('데이터베이스 연결 성공');
//         } catch (error) {
//             console.error('데이터베이스 연결 오류:', error);
//         }
//     }
// }
