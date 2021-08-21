const jwt = require('jsonwebtoken');
require('dotenv').config();

function validarCamposRegistro(req, res, next) {
    const { nombre, apellido, email, nombre_usuario, contrasena:plainTextPassword, direccion, pais, telefono } = req.body;

    if(!nombre_usuario || typeof nombre_usuario !== 'string') return res.status(500).json({error : "nombre usuario invalido"});
    if(!plainTextPassword || typeof plainTextPassword !== 'string') return res.status(500).json({ error: "Password invalido"});
    if(plainTextPassword.length < 8) return res.status(500).json({error: "contraseña muy corta"});
    next();
}

//Validate fields for user update
function validarActualizacion(req, res, next) {
    const token = req.query.token;
    const validateAdmin = jwt.verify(token, process.env.JWT_SECRET);
    const isAdmin = validateAdmin.isAdmin
    const { nombre, apellido, email, admin, activo} = req.body;

    let usuarioActualizar = {}
    if(nombre != null){
        usuarioActualizar.nombre = nombre;

    };
    if(apellido != null){
        usuarioActualizar.apellido = apellido; 
    }
    if(email != null){
        usuarioActualizar.email = email; 
    }
    if(isAdmin && admin !=null){
        usuarioActualizar.admin = admin;
    }
    if(isAdmin && activo!= null){
        usuarioActualizar.activo = activo;
    }

    res.usuarioActualizar = usuarioActualizar;
    next();
    
}

module.exports = { validarCamposRegistro, validarActualizacion };