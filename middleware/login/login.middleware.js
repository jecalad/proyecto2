const jwt = require('jsonwebtoken');
require('dotenv').config();

function validarToken(req, res, next){
    const token = req.query.token;

    try{
       jwt.verify(token, process.env.JWT_SECRET);
        next();
    }catch(err){
        return res.status(403).json({ status: "error", error: err});
    }
    
}

module.exports = {validarToken};