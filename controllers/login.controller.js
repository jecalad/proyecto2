const Perfiles = require('../models/perfil.models');
const Usuario = require('../models/user.models');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
require('dotenv').config();

async function usuarioLogin(nombre_usuario, contrasena){

    const perfil = await Perfiles.findOne({where:{nombre_usuario: nombre_usuario}});
    const user = await Usuario.findOne({where:{id: perfil.dataValues.user_id}})
    const isAdmin = user.dataValues.admin;
    

    if(perfil ===null) throw "usuario no encontrado";

    if(await bcrypt.compare(contrasena, perfil.dataValues.contrasena)){

        const token = jwt.sign({
            user_id: perfil.dataValues.user_id,
            nombre_usuario: perfil.dataValues.nombre_usuario,
            isAdmin: isAdmin
        }, process.env.JWT_SECRET, {expiresIn: 60*60}); 

        return token;
    }

    throw "usuario o contraseña invalidos";
    
}

module.exports = { usuarioLogin };