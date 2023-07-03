import { Schema, model } from "mongoose";
const BlogSchema = new Schema({
    title: {
        type: String,
        required: true,
    },
    desc: {
        type: String,
        required: true,
    },
    file_link: {
        type: String,
        required: true,
    },
}, {
    timestamps: true,
});
BlogSchema.pre("save", function (next) {
    this.updatedAt = new Date();
    next();
});
export default model("Blogs", BlogSchema);
