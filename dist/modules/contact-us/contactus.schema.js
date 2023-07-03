import { Schema, model, Types } from "mongoose";
const ContactSchema = new Schema({
    whom: {
        type: Types.ObjectId,
        ref: 'Users'
    },
    text: {
        type: String
    },
    email: {
        type: String
    }
}, {
    timestamps: true,
});
export default model("ContactUs", ContactSchema);
