import { JWT } from "../../utils/jwt.js";
import orderSchema from "./order.schema.js";
import flowerSchema from "../flowers/flower.schema.js";
export class OrderContr {
    constructor() { }
    static async GetMyOrders(req, res) {
        try {
            let { id } = req.params;
            let { token } = req.headers;
            let { user_id } = JWT.Verify(token);
            if (id) {
                let findOrder = await orderSchema.findOne({ user: user_id, _id: id }).populate('flowers');
                res.send({
                    status: 200,
                    message: `${id} -Oder`,
                    success: true,
                    data: findOrder,
                });
            }
            else {
                let findOrders = await orderSchema.find({ user: user_id }).populate('flowers');
                res.send({
                    status: 200,
                    message: "My Order",
                    success: true,
                    data: findOrders,
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
    static async GetUserOrderForAdmin(req, res) {
        try {
            let findOrders = await orderSchema.find().populate('flowers');
            res.send({
                status: 200,
                message: "Users' Order",
                success: true,
                data: findOrders,
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
    static async AddOrder(req, res) {
        try {
            let { token } = req.headers;
            let { user_id } = JWT.Verify(token);
            let { flowers, phone, sumprice, address, comment, typePayment, name } = req.body;
            if (!flowers || !phone || !sumprice || !address || !typePayment || !name) {
                throw new Error(`Data is incomplated`);
            }
            for (const el of flowers) {
                let checkExists = await flowerSchema.findById(el);
                if (checkExists == null) {
                    throw new Error(`Not Found Flower`);
                }
            }
            let newOrder = await orderSchema.create({
                flowers,
                user: user_id,
                sumprice,
                phone,
                address,
                comment,
                name,
                typePayment
            });
            return res.send({
                status: 200,
                message: "Successfuly Added Order",
                success: true,
                data: newOrder,
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
