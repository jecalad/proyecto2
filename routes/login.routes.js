const express = require('express');
const router = express.Router();
const { usuarioLogin } = require('../controllers/login.controller');



router.post('/',  async (req, res)=>{
    const {nombre_usuario, contrasena} = req.body;

    try{
        const login = await usuarioLogin(nombre_usuario, contrasena);
        return res.status(200).json({message: "login correcto", token: login});
    }catch(err){
        return res.status(500).json({"error": err});
    }
    
});

module.exports = router;