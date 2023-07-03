export const tokenCheckMiddleware = async (req, res, next) => {
    try {
        let { token } = req.headers;
        if (!token) {
            throw new Error(`You are not sent token from headers!`);
        }
        else {
            next();
        }
    }
    catch (error) {
        res.send({
            status: 400,
            success: false,
            message: `Token Middleware Error: ${error.message}`,
        });
    }
};
