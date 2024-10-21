const jwt = require('jsonwebtoken');
const Users = require('../models/userSchema');

const authenticate = async (req, res, next) => {
    try {
        const { authorization = '' } = req.headers;
        const [bearer, token] = authorization.split(' ');

        if (!authorization || !token) {
            return res.status(401).send("Invalid token");
        }

        // Verify the token
        const verifyToken = jwt.verify(token, 'THIS_IS_THE_SECRET_KEY_OF_JWT');
        
        // Find the user by ID
        const user = await Users.findOne({ _id: verifyToken.id });
        if (!user) {
            return res.status(401).send('User not found');
        }

        req.user = user; // Attach user to request
        next(); // Call next middleware or route handler
    } catch (error) {
        if (error instanceof jwt.TokenExpiredError) {
            // Handle token expired error
            return res.status(401).send("Token has expired");
        } else if (error instanceof jwt.JsonWebTokenError) {
            // Handle invalid token error
            return res.status(401).send("Invalid token");
        }
        // For any other error
        return res.status(500).send("Internal server error");
    }
};

module.exports = authenticate;
