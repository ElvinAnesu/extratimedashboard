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
    active: {
        type:Boolean,
        default: true
    },
    role:{
        type: String,
        required: true
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