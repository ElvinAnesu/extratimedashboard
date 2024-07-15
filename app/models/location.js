import mongoose, { Schema } from "mongoose";

const locationSchema = new Schema({
    location :{
        type: String,
        required:["location is required"]
    }
},{timestamps: true})

const Location = mongoose.models.Location || mongoose.model("Location", locationSchema)

export default Location