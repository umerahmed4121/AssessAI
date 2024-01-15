import { sign, verify } from 'jsonwebtoken';

export const generateToken = (payload) => {
    return sign(payload, process.env.JWT_SECRET, { expiresIn: '1d' });
};

export const verifyToken = (token) => {
    try {
        return verify(token, process.env.JWT_SECRET);
    } catch (error) {
        return false;
    }
}