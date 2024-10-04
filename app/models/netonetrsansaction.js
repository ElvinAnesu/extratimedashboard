import mongoose, { Schema } from "mongoose";

const netoneTransactionSchema = new Schema(
	{
		executedBy: {
			type: String,
			required: true,
		},
		executerId: {
			type: String,
			required: true,
		},
		currency: {
			type: String,
			required: true,
		},
		receiver: {
			type: String,
			required: true,
		},
		amount: {
			type: Number,
			required: true,
		},
		isSuccessful: {
			type: Boolean,
			default: false,
		},
		cleared: {
			type: Boolean,
			default: false,
		},
		clearedBy: {
			type: String,
			default: null,
		},
		clearedAt: {
			type: Date,
			default: null,
		},
		cashedIn: {
			type: Boolean,
			default: false,
		},
		cashedInAt: {
			type: Date,
			default: null,
		},
		details: {
			type: {},
			default: {},
		},
	},
	{ timestamps: true }
);
const NetoneTransaction =
	mongoose.models.NetoneTransaction ||
	mongoose.model("NetoneTransaction", netoneTransactionSchema);

export default NetoneTransaction;
