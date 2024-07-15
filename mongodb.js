import mongoose from "mongoose";

const connectdb = async() => { 
    try{ 
        if(mongoose.connection.readyState === 0){
            await mongoose.connect("mongodb+srv://elvinlite:iUJTfGm8ForEueYo@cluster0.9pd6kmd.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0");
            console.log("db reconnected");
        }
        console.log("reconnected");
    }catch(error){
        console.log(error);
    }
}

export default connectdb;