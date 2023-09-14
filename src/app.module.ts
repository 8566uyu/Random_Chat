import { Module } from '@nestjs/common';
import { ChatBackEndModule } from './chatBackEnd/chatBackEnd.module';
import { ChatFrontEndModule } from './chatFrontEnd/chatFrontEnd.module';
import {
    CommunityController,
    CreateController
} from './community/community.controller';
// import { LoginController,
//     RegisterController } from './auth/auth.controller'
import { TypeOrmModule } from '@nestjs/typeorm'
import { Community } from './domain/community.entity'
import { AuthModule } from './auth/auth.module';
import { user } from './domain/user.entity'
import { createConnection } from 'mysql2'
import { UserAuthority } from './domain/user-authority.entity'
import { ormConfig } from './orm.config'
import { ConfigModule } from '@nestjs/config'
import config from './config/config';



@Module({
    imports: [
        ConfigModule.forRoot({
            load: [config],
           isGlobal:true
        }),
        ChatBackEndModule,
        ChatFrontEndModule,
        TypeOrmModule.forRootAsync({ useFactory: ormConfig }),
        AuthModule
    ],
    controllers: [CommunityController,
        CreateController
        // LoginController,
        // RegisterController
    ],

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
