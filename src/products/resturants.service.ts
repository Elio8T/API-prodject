import {Injectable, NotFoundException} from '@nestjs/common';
import { resturant } from './resturant.model';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';


@Injectable()
export class resturantService{
    

    constructor(@InjectModel('resturant') private readonly resturantModel: Model<resturant>) {}


    async insertresturant(name: string, desc: string, genre: string, price: number ){
       
        
        const newresturant = new this.resturantModel({
            name: name, 
            desc: desc,
            genre, 
            price,
        });
        const result = await  newresturant.save();
        return result.id as string;
     

    }

    async getresturant(){
       const resturants = await  this.resturantModel.find().exec();
    
        return resturants.map((resturant) => ({id: resturant.id, name: resturant.name, desc: resturant.desc, genre: resturant.genre, price: resturant.price}));
    }

    async getSingleresturant(resturantId: string){
        const resturant = await this.findresturant(resturantId);
        return {id: resturant.id, name: resturant.name, desc: resturant.desc, genre: resturant.genre, price: resturant.price};
    }

//31:42
    async updateresturant(resturantId: string, name: string, desc: string, genre: string, price: number){
        const updatedresturant = await this.findresturant(resturantId);
        
        if(name){
            updatedresturant.name = name;
        }
        if(desc){
            updatedresturant.desc = desc;
        }
        if(genre){
            updatedresturant.genre = genre;
        }
        if(price){
            updatedresturant.price = price;
        }
        updatedresturant.save();
    }


    async deleteresturant(resturantID: string){
        const result = await this.resturantModel.deleteOne({_id: resturantID}).exec;
        if (result.length ===0){
            throw new NotFoundException('could not find');
        }
    }
    private async findresturant(id: string): Promise<resturant>{
        let resturant;
        try{
        resturant = await this.resturantModel.findById(id).exec();
        } catch(error){
            throw new NotFoundException('could not find');
        }
        if (!resturant){
            throw new NotFoundException('could not find');
        }
        return resturant;
    }

    

    

}