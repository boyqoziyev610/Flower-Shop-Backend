import { Schema, model, Types } from "mongoose";
const CommentSchema = new Schema({
    user: {
        type: Types.ObjectId,
        ref: "Users",
        required: true,
    },
    flower: {
        type: Types.ObjectId,
        ref: "Flowers",
    },
    blog: {
        type: Types.ObjectId,
        ref: "Blogs",
    },
    comment: {
        type: String,
        required: true,
    },
}, {
    timestamps: true,
});
CommentSchema.pre("save", function (next) {
    this.updatedAt = new Date();
    next();
});
export default model("Comments", CommentSchema);
