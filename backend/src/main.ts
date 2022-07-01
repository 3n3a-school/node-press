import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
// import * as winston from 'winston'
// import { WinstonModule } from 'nest-winston';

// , {      
//   logger: WinstonModule.createLogger({
//     level: 'debug',
//     format: winston.format.json(),
//     transports: [
//       new winston.transports.File({ filename: 'error.log', level: 'error' }),
//       new winston.transports.File({ filename: 'combined.log' }),
//     ],
//   })
// })
async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors()
  await app.listen(3000);
}
bootstrap();
