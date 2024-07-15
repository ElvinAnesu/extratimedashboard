import mongoose, { Schema } from "mongoose";

const allocationSchema = new Schema({
    agentid:{
        type :String,
        required:true
    },
    usdvouchers :{
        type:[{}],
        required:true
    },
    zigvouchers :{
        type:[{}],
        required:true
    },
    
})