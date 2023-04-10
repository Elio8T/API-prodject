import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { foodsController } from './food.controller';
import { foodService } from './food.service';
import { foodSchema } from './food.model';
@Module({
    imports: [MongooseModule.forFeature([{name: 'food', schema: foodSchema}])],
    controllers: [foodsController],
    providers: [foodService],

})

export class foodsModule {}