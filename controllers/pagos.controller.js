const Pago = require('../models/pagos.model')

async function listarMetodosPago(){
    try{
        const pago = await Pago.findAll();
        return pago;
    }catch(err){
        console.log(err);
        throw err;
    }
};

async function listarUnMetodoPago(id){

    try{
        const pago = await Pago.findByPk(id);
        if(!pago) throw "Método de pago no encontrado";
        return pago;
    }catch(err){
        throw err;
    }
};

async function crearMetodoPago(tipo){
    try{
        const pago = await Pago.create({
            tipo: tipo
        });
        return pago
    }catch(err){
        throw err;
    }
};

async function actualizarPago(datos, id){
    try{
        const pago = await Pago.findByPk(id);
        if(!pago) throw "Método de pago no encontrado";
        await Pago.update({tipo: datos}, {where:{id:id}});
    }catch(err){
        throw err;
    }
}

async function borrarPago(id){
    try{
        const pago = await Pago.findByPk(id);
        if(!pago) throw "Método de pago no encontrado";
        await Pago.destroy({ where: {id: id}})
    }catch(err){
        throw err;
    }
}

module.exports = {listarMetodosPago, crearMetodoPago, listarUnMetodoPago, borrarPago, actualizarPago};