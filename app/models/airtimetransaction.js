import mongoose,{Schema} from "mongoose";

const airtimetransactionSchema = new Schema({
    executedby : {
        type: String,
        required: true
    },
    executerid: {
        type: String,
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
        default:false,
    },
    cleared : {
        type : Boolean,
        default: false
    },
    clearedby : {
        type : String,
        default: null
    },
    clearedat:{
        type: String,
        default: null
    },
    cashedin : {
        type : Boolean,
        default: false
    },
    extras : {
        type : {},
        default:{}
    }
},{timestamps : true})

const Airtimetransaction = mongoose.models.Airtimetransaction || mongoose.model("Airtimetransaction", airtimetransactionSchema)

export default Airtimetransaction