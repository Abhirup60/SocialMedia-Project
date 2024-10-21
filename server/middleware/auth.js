const jwt = require('jsonwebtoken');
const Users = require('../models/userSchema');

const authenticate = async (req, res, next) => {
    if (req.method === 'OPTIONS') {
        res.header('Access-Control-Allow-Origin', 'https://social-media-project-frontend.vercel.app');
        res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
        res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
        return res.status(200).end(); // Stop further processing for preflight request
    }

    try {
        const { authorization = '' } = req.headers;
        
        if (!authorization.startsWith('Bearer ')) {
            res.header('Access-Control-Allow-Origin', 'https://social-media-project-frontend.vercel.app');  // Add CORS header
            return res.status(401).send("Authorization header must start with 'Bearer'");
        }

        const token = authorization.split(' ')[1];

        if (!token) {
            res.header('Access-Control-Allow-Origin', 'https://social-media-project-frontend.vercel.app');  
            return res.status(401).send("Token is missing");
        }

        // Verify the token
        const verifyToken = jwt.verify(token, process.env.JWT_SECRET_KEY || 'THIS_IS_THE_SECRET_KEY_OF_JWT');

        // Find the user by ID
        const user = await Users.findById(verifyToken.id);
        if (!user) {
            res.header('Access-Control-Allow-Origin', 'https://social-media-project-frontend.vercel.app');  // Add CORS header
            return res.status(401).send('User not found');
        }

        req.user = user; // Attach user to request
        next(); // Call next middleware or route handler
    } catch (error) {
        res.header('Access-Control-Allow-Origin', 'https://social-media-project-frontend.vercel.app');  // Add CORS header

        if (error instanceof jwt.TokenExpiredError) {
            return res.status(401).send("Token has expired");
        } else if (error instanceof jwt.JsonWebTokenError) {
            return res.status(401).send("Invalid token");
        }
        return res.status(500).send("Internal server error");
    }
};

module.exports = authenticate;
