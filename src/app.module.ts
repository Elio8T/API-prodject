import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ressturantsModule } from './products/resturants.module';

@Module({
  imports: [ressturantsModule, MongooseModule.forRoot(
    'mongodb+srv://Elio:Elio@cluster0.ixhmqdr.mongodb.net/nestjs'
  )],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

