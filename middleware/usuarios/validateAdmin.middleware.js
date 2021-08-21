const jwt = require('jsonwebtoken');
require('dotenv').config();

async function validateAdmin(req, res, next) {

    const token = req.query.token;
    const validateAdmin = jwt.verify(token, process.env.JWT_SECRET);
    const isAdmin = validateAdmin.isAdmin

    if(!isAdmin) return res.status(500).json( {error : "not authorized"});
    next();
}

module.exports = { validateAdmin };