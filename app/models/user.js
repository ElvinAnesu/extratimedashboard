import { Timestamp } from "mongodb"
import mongoose, { Schema } from "mongoose"

const userSchema = new Schema({
    email : {
        type: String,
        required: true
    },
    password : {
        type : String,
        required: true
    },
    surname: {
        type : String,
        required: true
    },
    firstname: {
        type : String,
        required: true
    },
    phonenumber: {
        type: String,
        required: true
    },
    location: {
        type: String,
        default: null
    }, 
    supervisor: {
        type: String,
        default: null
    },
    role:{
        type: String,
        required: true
    },
    address:{
         type:String,
         required:null
    },
    nextofkeen:{
        type:String,
        required:null
    },
    machinenumber:{
        type:String,
        required:null
    },
    nextofkeenphonenumber:{
        type:String,
        required:null
    },
    assignedVouchers: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Voucher'
    }],
},{
    timestamps: true
})

const User = mongoose.models.User || mongoose.model("User", userSchema)

export default User