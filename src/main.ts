import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { WsAdapter } from '@nestjs/platform-ws';
import { join } from 'path';
import { AppModule } from './app.module';
import { SocketIoAdapter } from './adapters/socket-io.adapters';
import cookieParser from 'cookie-parser'
import { ConfigService } from '@nestjs/config'
import { ValidationPipe } from '@nestjs/common'

async function bootstrap() {
    
    const app = await NestFactory.create<NestExpressApplication>(AppModule);
    app.useWebSocketAdapter(new SocketIoAdapter(app));
    app.useStaticAssets(join(__dirname, '..', 'public'));
    app.setBaseViewsDir(join(__dirname, '..', 'views'));
    app.setViewEngine('ejs');
    app.use(cookieParser());
    app.useGlobalPipes(new ValidationPipe({ transform: true }));
    
    const configService = app.get(ConfigService);
    const port = configService.get<string>('server.port');
    
    await app.listen(port);
    console.log(`Application listening on port ${port}`);
}
bootstrap();
