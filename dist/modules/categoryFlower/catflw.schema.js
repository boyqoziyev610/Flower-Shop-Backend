import { Schema, model } from "mongoose";
const CategoryFlower = new Schema({
    category: String,
}, {
    timestamps: true,
});
export default model("CategoryFlowers", CategoryFlower);
