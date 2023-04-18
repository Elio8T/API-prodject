import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { resturantsController } from './resturants.controller';
import { resturantService } from './resturants.service';
import { resturantSchema } from './resturant.model';
@Module({
    imports: [MongooseModule.forFeature([{name: 'resturant', schema: resturantSchema}])],
    controllers: [resturantsController],
    providers: [resturantService],

})

export class ressturantsModule {}