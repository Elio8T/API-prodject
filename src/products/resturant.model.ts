import * as mongoose from 'mongoose';

export const resturantSchema = new mongoose.Schema({
    name: {type: String, required: true},
    desc: {type: String, required: true},
    genre: {type: String, required: true},
    price: {type: Number, required: true},
});


export interface resturant extends mongoose.Document{
    
    id: string;
    name: string;
    desc: string;
    genre: string;
    price: number;
}