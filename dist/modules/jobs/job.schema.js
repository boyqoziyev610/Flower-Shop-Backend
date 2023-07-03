import { Schema, model } from "mongoose";
const JobSchema = new Schema({
    job: {
        type: String,
        required: true
    },
    desc: {
        type: String,
        default: null
    }
}, {
    timestamps: true,
});
export default model('Jobs', JobSchema);
