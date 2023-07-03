import { JWT } from "../../utils/jwt.js";
import commentSchema from "./comment.schema.js";
export class CommentContr {
    constructor() { }
    static async GetComment(req, res) {
        try {
            const { query, _id } = req.query;
            const { flower_id } = req.params;
            if (query && query == "blog" && _id) {
                const responseData = await commentSchema
                    .find({ blog: _id })
                    .populate("user")
                    .sort({ createdAt: -1 });
                res.send({
                    status: 200,
                    message: `Comments`,
                    success: true,
                    data: responseData
                });
            }
            else {
                const responseData = await commentSchema
                    .find({ flower: flower_id })
                    .populate("user")
                    .sort({ createdAt: -1 });
                res.send({
                    status: 200,
                    message: `All Comment`,
                    success: true,
                    data: responseData,
                });
            }
        }
        catch (error) {
            res.send({
                status: 400,
                success: false,
                message: `Error : ${error.message}`,
            });
        }
    }
    static async AddComment(req, res) {
        try {
            const { token } = req.headers;
            let { user_id } = JWT.Verify(token);
            const { flower, comment, blog } = req.body;
            let newComment = await commentSchema.create({
                user: user_id,
                flower,
                blog,
                comment,
            });
            console.log(newComment);
            res.send({
                status: 201,
                message: "Successfuly added comment",
                success: true,
                data: newComment,
            });
        }
        catch (error) {
            res.send({
                status: 400,
                success: false,
                message: `Error : ${error.message}`,
            });
        }
    }
    static async PutComment(req, res) {
        try {
            const { id } = req.params;
            let { token } = req.headers;
            let { user_id } = JWT.Verify(token);
            const { comment } = req.body;
            if (!comment) {
                throw new Error(`Not Found purpose`);
            }
            const checkExists = await commentSchema.findById(id);
            if (checkExists == null) {
                throw new Error(`Not Found ${id} - comment`);
            }
            if (checkExists.user != user_id) {
                throw new Error(`You cannot update other user's comment!`);
            }
            let updatedComment = await commentSchema.findByIdAndUpdate(id, { comment }, { new: true });
            res.send({
                status: 200,
                message: "Successfuly updated comment",
                success: true,
                data: updatedComment,
            });
        }
        catch (error) {
            res.send({
                status: 400,
                success: false,
                message: `Error : ${error.message}`,
            });
        }
    }
    static async DeleteComment(req, res) {
        try {
            let { id } = req.params;
            let { token } = req.headers;
            let { user_id } = JWT.Verify(token);
            const checkExists = await commentSchema.findById(id);
            if (checkExists == null) {
                throw new Error(`Not Found ${id} - comment`);
            }
            if (checkExists.user != user_id) {
                throw new Error(`You cannot delete other user's comment!`);
            }
            let deletedComment = await commentSchema.findByIdAndDelete(id);
            res.send({
                status: 200,
                message: "Successfuly deleted comment",
                success: true,
                data: deletedComment,
            });
        }
        catch (error) {
            res.send({
                status: 400,
                success: false,
                message: `Error : ${error.message}`,
            });
        }
    }
}
