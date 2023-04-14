import * as mongoose from 'mongoose';

export const foodSchema = new mongoose.Schema({
    name: {type: String, required: true},
    desc: {type: String, required: true},
    genre: {type: String, required: true},
    price: {type: Number, required: true},
    ingrid: {type: String, required: true},
});


export interface food extends mongoose.Document{
    
    id: string;
    name: string;
    desc: string;
    genre: string;
    price: number;
    ingrid: string;
}