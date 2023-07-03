import { JWT } from "../utils/jwt.js";
import userSchema from "../modules/users/user.schema.js";
export const adminCheckMiddleware = async (req, res, next) => {
    try {
        let { token } = req.headers;
        if (!token) {
            throw new Error(`You are not sent token from headers`);
        }
        let { user_id } = JWT.Verify(token);
        let checkAdmin = await userSchema.findById(user_id);
        if (checkAdmin?.role != "admin") {
            throw new Error(`You are not admin!`);
        }
        else {
            next();
        }
    }
    catch (error) {
        res.send({
            status: 400,
            success: false,
            message: `Admin Middleware Error: ${error.message}`,
        });
    }
};
