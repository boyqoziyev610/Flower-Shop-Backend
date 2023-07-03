import jwt from 'jsonwebtoken';
import config from 'config';
const JWT_SECRET = config.get('jwt_secret');
export const JWT = {
    Sign(payload) {
        return jwt.sign({ user_id: payload }, JWT_SECRET);
    },
    Verify(token) {
        return jwt.verify(token, JWT_SECRET);
    },
};
