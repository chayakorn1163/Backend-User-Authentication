const jwt = require('jsonwebtoken');



const authMiddleware = (req , res , next) =>{
    const token = req.header('x-oauth-token');

    if (!token) return res.status(401).json({message: 'no token, authorization denied'})

        try{
            const decoded = jwt.verify(token ,process.env.jwt_SECRET);
            req.user = decoded;
            next();
        } catch(error) {
            res.status(400).json({message: 'token is not valid'})
        }
}

module.exports = authMiddleware;