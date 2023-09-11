import { Module } from '@nestjs/common';
import { ChatBackEndModule } from './chatBackEnd/chatBackEnd.module';
import { ChatFrontEndModule } from './chatFrontEnd/chatFrontEnd.module';
import { CommunityController, CreateController } from './community/community.controller';


@Module({
    imports: [ChatBackEndModule, ChatFrontEndModule],
    controllers: [CommunityController,CreateController],
    
})
export class AppModule {}
