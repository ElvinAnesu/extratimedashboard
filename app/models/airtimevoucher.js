import mongoose, { Schema } from "mongoose";

const airtimevoucherSchema = new Schema({
    serialno : {
        type: Number,
        required:true
    },
    batchno : {
        type:Number,
        required : true
    },
    rechargepin : {
        type : Number,
        required: true
    },
    amount : {
        type: Number,
        required: true
    },
    currency : {
        type: String,
        required: true
    },
    sold : {
        type: Boolean,
        default:false
    },
    allocatedto:{
        type:String,
        default:null
    },
    allocated:{
        type: Boolean,
        default:false
    },
    
},{
    timestamps: true 
})

const AirtimeVoucher = mongoose.models.AirtimeVoucher || mongoose.model("AirtimeVoucher", airtimevoucherSchema)

export default AirtimeVoucher