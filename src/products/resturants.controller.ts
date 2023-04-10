import { Controller, Post, Body, Get, Param, Patch, Delete } from "@nestjs/common";
import { resturantService } from './resturants.service';
@Controller('resturants')
export class resturantsController {
    constructor(private readonly resturantsService: resturantService) {}
    
    @Post()

    async addresturant(@Body('name') resturantName: string, 
    @Body('desc') resturantDesc: string,
    @Body('genre') resturantgenre: string,
    @Body('price') resturantPrice: number,
    ) {
        const generatedID = await this.resturantsService.insertresturant(resturantName, resturantDesc, resturantgenre, resturantPrice);
        return {id: generatedID};
    }

    @Get()
    async getAllresturant(){
        const resturants = await this.resturantsService.getresturant(); 
        return resturants;
    }

    @Get(':id')
    getresturant(@Param('id') resturantId: string){
        return this.resturantsService.getSingleresturant(resturantId);

    }
    //
    
//https://www.youtube.com/watch?v=F_oOtaxb0L8 1:03:22




    @Patch(':id')
    async updateresturant(@Param('id') resturantId: string, @Body('name') resturantName: string, @Body('description') resturantDesc: string, @Body('genre') resturantgenre: string, @Body('price') resturantPrice: number){
        await this.resturantsService.updateresturant(resturantId, resturantName, resturantDesc, resturantgenre, resturantPrice);
        return null;
    }   

    @Delete(':id')
    async removeresturant(@Param('id') resturantId: string,){
        await this.resturantsService.deleteresturant(resturantId);
        return null;
    }
}
