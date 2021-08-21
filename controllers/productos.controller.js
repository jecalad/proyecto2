const Productos = require('../models/product.model');

async function listarProductos(){
    try{
        const productos = await Productos.findAll();
        return productos;
    }catch(err){
        throw err;
    }
}

async function listarUnProducto(id){
    try{
        const producto = await Productos.findByPk(id);
        if(!producto) throw "producto no encontrado";

        return producto;
    }catch(err){
        throw err;
    }
}

async function crearProducto(nombre, categoria, precio, stock, seccion){
    try{
        const createPdto = await Productos.create({
            nombre: nombre,
            categoria: categoria,
            precio: precio,
            stock: stock,
            seccion: seccion
        });
        return createPdto;
    }catch(err){
        throw err;
    }
}

async function actualizarProducto(datosProducto, id){
    try{
        const producto = await Productos.findByPk(id);
        if(!producto) throw "producto no encontrado";

        await Productos.update(datosProducto, {where:{id:id}});
        return "producto actualizado"
    }catch(err){
        throw err;
    }
}

async function borrarProducto(id){
    try{
        const producto = await Productos.findByPk(id);
        if(!producto) throw "producto no encontrado";

        await Productos.destroy({where:{id:id}});
        return "producto eliminado";
    }catch(err){
        throw err;
    }
}

module.exports = { listarProductos, crearProducto, actualizarProducto, borrarProducto, listarUnProducto };