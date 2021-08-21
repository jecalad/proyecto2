const Usuario = require('../models/user.models');
const Perfiles = require('../models/perfil.models');


async function createUser(nombre, apellido, email, nombre_usuario, contrasena, direccion, pais, telefono ){
    
        const usuario = await Usuario.create({
            nombre: nombre,
            apellido: apellido,
            email: email
        });    
        const perfil = await Perfiles.create({
            nombre_usuario: nombre_usuario,
            contrasena: contrasena,
            direccion: direccion,
            pais: pais,
            telefono: telefono
        });
        await usuario.setPerfil(perfil);
        
        let createduser = usuario
        createduser.dataValues.perfil = perfil;
        return createduser;
    
}

async function listarUsuarios(){
    try{
        const usuario = await Usuario.findAll({
            include: 'perfil'
        });
        return usuario;
    }catch(err){
        console.log(err);
        throw err;
    }
}

async function listarUsuario(id){
    try{
        const usuario = await Usuario.findByPk(id, { include: 'perfil'}, {where: {user_id:id}});
        if(usuario ===null) throw "user not found"; 
        return usuario;
    }catch (err){
        throw err;
    }
}


async function actualizarUsuario(datosUsuario, id){
    try{
        const usuario = await Usuario.findByPk(id);
        if (!usuario) throw "usuario not found";

        await Usuario.update(datosUsuario, {where: {id:id}})
        return "usuario actualizado exitosamente";

    }catch (err){
        throw err;
    }
}

async function borrarUsuario(id){

    try{
        const usuario = await Usuario.findByPk(id);
        if (!usuario) throw "usuario not found";

        await Usuario.destroy({where: {id: id}});
        return "usuario borrado exitosamente"
    }catch (err){
        throw err;
    }
}

module.exports = {createUser, listarUsuarios, listarUsuario, actualizarUsuario, borrarUsuario};