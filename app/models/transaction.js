import mongoose, { Schema } from "mongoose";

const transactionSchema = new Schema({
    transaction : {
        type : String,
        required: true
    },
    username : {
        type : String,
        required: true
    },
    userid : {
        type : String,
        required: true
    },
    currency : {
        type : String,
        required: true
    },
    amount : {
        type : String,
        required: true
    },
    issuccessful : {
        type : Boolean,
        required: true
    },
    cleared : {
        type : Boolean,
        default: false
    },
    clearedby : {
        type : String,
        default: null
    },
    
    extras : {
        type : {},
        default:{}
    }

},{timestamps : true})

const Transaction = mongoose.models.Transaction || mongoose.model("Transaction", transactionSchema)

export default Transaction