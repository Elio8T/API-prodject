import { Controller, Post, Body, Get, Param, Patch, Delete } from "@nestjs/common";
import { foodService } from './food.service';
@Controller('foods')
export class foodsController {
    constructor(private readonly foodsService: foodService) {}
    
    @Post()

    async addfood(@Body('name') foodName: string, 
    @Body('desc') foodDesc: string,
    @Body('genre') foodgenre: string,
    @Body('price') foodPrice: number,
    @Body('ingrid') foodingrid: string,
    ) {
        const generatedID = await this.foodsService.insertfood(foodName, foodDesc, foodgenre, foodPrice, foodingrid);
        return {id: generatedID};
    }

    @Get()
    async getAllfood(){
        const foods = await this.foodsService.getfood(); 
        return foods;
    }

    @Get(':id')
    getfood(@Param('id') foodId: string){
        return this.foodsService.getSinglefood(foodId);

    }
    




    @Patch(':id')
    async updatefood(@Param('id') foodId: string, @Body('name') foodName: string, @Body('description') foodDesc: string, @Body('genre') foodgenre: string, @Body('price') foodPrice: number, @Body('ingrid') foodingrid: string){
        await this.foodsService.updatefood(foodId, foodName, foodDesc, foodgenre, foodPrice, foodingrid);
        return null;
    }   

    @Delete(':id')
    async removefood(@Param('id') foodId: string,){
        await this.foodsService.deletefood(foodId);
        return null;
    }
}
