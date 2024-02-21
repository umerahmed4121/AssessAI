import { sign, verify } from 'jsonwebtoken';

 const generateToken = async (payload) => {
    try {
        const token = sign(payload, process.env.JWT_SECRET, { 
            expiresIn: '1d',
            
          });
        return token
    } catch (error) {
        console.error(error)
    }
     
};

 const verifyToken = async (token) => {
    try {
        return verify(token, process.env.JWT_SECRET)
    } catch (error) {
        console.error(error.message)
        return null;
    }
}

export { generateToken, verifyToken };
