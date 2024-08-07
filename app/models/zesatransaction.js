import mongoose,{Schema} from "mongoose";

const zesatransactionSchema = new Schema({
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
    extras : {
        type : {},
        default:{}
    }
},{timestamps : true})

const Zesatransaction = mongoose.models.Zesatransaction || mongoose.model("Zesatransaction", zesatransactionSchema)

export default Zesatransaction