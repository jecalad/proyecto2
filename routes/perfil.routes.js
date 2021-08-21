const express = require('express');
const router = express.Router();
const updatePerfil = require('../controllers/perfil.controller');

router.put('/:id', async (req, res)=>{
    let { id }  = req.params;
    id= parseInt(id);
    
    let {nombre_usuario, contrasena, direccion, pais, telefono } = req.body;
    telefono = parseInt(telefono);
    try{
        const perfil = await updatePerfil(nombre_usuario, contrasena, direccion, pais, telefono, id);
        await res.status(201).json(perfil);
    }catch(err){
        res.status(500).json({error: err});
    }

});

module.exports = router;