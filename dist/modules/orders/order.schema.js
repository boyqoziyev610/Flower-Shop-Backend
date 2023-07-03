import { Schema, model, Types } from "mongoose";
const OrderSchema = new Schema({
    user: {
        type: Types.ObjectId,
        ref: "Users",
    },
    flowers: [{
            type: Types.ObjectId,
            ref: "Flowers",
        }],
    sumprice: {
        type: String,
    },
    name: {
        type: String
    },
    address: {
        type: String,
    },
    comment: {
        type: String
    },
    typePayment: {
        type: String,
        enum: ['payme', 'spot']
    },
    phone: {
        type: String,
        match: /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/,
    },
}, {
    timestamps: true,
});
export default model("Orders", OrderSchema);
