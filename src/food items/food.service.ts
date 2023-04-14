import {Injectable, NotFoundException} from '@nestjs/common';
import { food } from './food.model';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';


@Injectable()
export class foodService{
    

    constructor(@InjectModel('food') private readonly foodModel: Model<food>) {}


    async insertfood(name: string, desc: string, genre: string, price: number, ingrid:string ){
       
        
        const newfood = new this.foodModel({
            name: name, 
            desc: desc,
            genre, 
            price,
            ingrid,
        });
        const result = await  newfood.save();
        return result.id as string;
     

    }

    async getfood(){
       const foods = await  this.foodModel.find().exec();
    
        return foods.map((food) => ({id: food.id, name: food.name, desc: food.desc, genre: food.genre, price: food.price, ingrid: food.ingrid}));
    }

    async getSinglefood(foodId: string){
        const food = await this.findfood(foodId);
        return {id: food.id, name: food.name, desc: food.desc, genre: food.genre, price: food.price, ingrid:food.ingrid};
    }

//31:42
    async updatefood(foodId: string, name: string, desc: string, genre: string, price: number, ingrid: string){
        const updatedfood = await this.findfood(foodId);
        
        if(name){
            updatedfood.name = name;
        }
        if(desc){
            updatedfood.desc = desc;
        }
        if(genre){
            updatedfood.genre = genre;
        }
        if(price){
            updatedfood.price = price;
        }
        if(ingrid){
            updatedfood.ingrid = ingrid;
        }
        updatedfood.save();
    }


    async deletefood(foodID: string){
        const result = await this.foodModel.deleteOne({_id: foodID}).exec();
        if (result.deletedCount ===0){
            throw new NotFoundException('could not find');
        }
    }
    private async findfood(id: string): Promise<food>{
        let food;
        try{
        food = await this.foodModel.findById(id).exec();
        } catch(error){
            throw new NotFoundException('could not find');
        }
        if (!food){
            throw new NotFoundException('could not find');
        }
        return food;
    }

    

    

}