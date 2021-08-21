const Pedidos = require('../models/pedidos.model');
const ProductosxPedidos = require('../models/productosxpedidos.model');
const Producto = require('../models/product.model');
const Pago = require('../models/pagos.model');


async function crearPedido(usuario_id, producto_id, pago_id, direccion, cantidad){

    //verificar si existe pedido
    const validarPedido = await Pedidos.findOne({where: {usuario_id: usuario_id}})

    const producto = await Producto.findOne({ where: { id: producto_id } });
    if(producto ==null) throw "producto no encontrado";

    const validarMetodoPago = await Pago.findOne({where:{id:pago_id}});
    if(validarMetodoPago == null) throw "metodo de pago no encontrado";

    const totalPedido = parseFloat(producto.dataValues.precio)*cantidad;

    if(validarPedido==null || validarPedido.dataValues.estado == "cerrado"){
        try{
            const pedido = await Pedidos.create({
                usuario_id: usuario_id,
                pago_id: pago_id,
                direccionxenvio: direccion,
                total : totalPedido
            });    
            const productosxpedidos = await ProductosxPedidos.create({
                cantidad: cantidad,
                product_id: producto_id,
                pedido_id: pedido.dataValues.id
            });

            return [pedido, productosxpedidos];

            }catch(err){
                console.log(err);
                throw err;
            }
    }else{

        const pedidoTotalActual = await Pedidos.findOne({where: {id: validarPedido.dataValues.id}});
        const total = parseFloat(pedidoTotalActual.dataValues.total)+ totalPedido;

        const validarProductosxPedidos = await ProductosxPedidos.findOne({where:{product_id: producto_id}});

        if (validarProductosxPedidos!==null && validarProductosxPedidos.dataValues.product_id == producto_id){
            const updateProductosxPedidos = await ProductosxPedidos.update({
                cantidad: cantidad + validarProductosxPedidos.dataValues.cantidad
            },{where:{product_id: validarProductosxPedidos.dataValues.product_id}});

            const updatePedido = await Pedidos.update({
                total: total
            }, {where:{id: validarPedido.dataValues.id}});
            return[updatePedido,updateProductosxPedidos];
        }else{
            const productosxpedidos = await ProductosxPedidos.create({
                cantidad: cantidad,
                product_id: producto_id,
                pedido_id: validarPedido.dataValues.id
                
            });

            const updatePedido = await Pedidos.update({
                total: total
            }, {where:{id: validarPedido.dataValues.id}});

            return[updatePedido,productosxpedidos];
        }

        
    }
    
}

//Get orders by ID
async function listarPedido(id){
    try{
    //const pedido = await Pedidos.findOne({include: 'productosxpedidos'},{where: {pedido_id:id}});
    const pedido = await Pedidos.findByPk(id, { include: 'productosxpedidos'}, {where: {pedido_id:id}});
    if (pedido === null) return ('not found');
        return pedido;
    }catch(err){
        throw err;
    }
    //if(pedido !==null) return pedido;
  
}

async function listarPedidos(){
    try{
        const pedidos = await Pedidos.findAll({ include: 'productosxpedidos'});
        return pedidos;
    }catch(err){
        throw err;
    }
}

async function actualizarPedido(datos, id){
    try{
        await Pedidos.update(datos, {where:{id:id}});
        return "pedido actualizado"
    }catch(err){
        throw err;
    }
}

module.exports = {crearPedido, listarPedido, listarPedidos, actualizarPedido};