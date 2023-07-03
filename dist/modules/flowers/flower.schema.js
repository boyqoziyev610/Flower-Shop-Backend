import { Schema, model, Types } from "mongoose";
const FlowersSchema = new Schema({
    name: {
        type: String,
        required: [true, "Name is required!"],
    },
    img_link: {
        type: String,
    },
    price: {
        type: String,
    },
    category: {
        type: Types.ObjectId,
        ref: "CategoryFlowers",
    },
    type_f: {
        type: String,
        required: true,
        enum: ["bouqute", "peace", "set"],
    },
    desc: {
        type: String,
        default: null,
    },
    solded: {
        type: Number,
        default: 0,
    },
}, {
    timestamps: true,
});
export default model("Flowers", FlowersSchema);
