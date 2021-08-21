const Perfil = require('../models/perfil.models');

async function updatePerfil(nombre_usuario, contrasena, direccion, pais, telefono, id){
    try{
        const perfil = await Perfil.findOne({where:{id: id}})
            //console.log(perfil);
                if(perfil){
                    perfil.update({
                        nombre_usuario: nombre_usuario,
                        contrasena: contrasena,
                        direccion: direccion,
                        pais: pais,
                        telefono: telefono
                    })
                }
            return perfil
            }catch(err){
                console.log(err);
                throw err;
            }
}

module.exports = updatePerfil;