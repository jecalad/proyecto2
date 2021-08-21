const Pedidos = require('../../models/pedidos.model');
const ProductosxPedidos = require('../../models/productosxpedidos.model');

const jwt = require('jsonwebtoken');
require('dotenv').config();

async function validarActualizacionPedido(req, res, next) {
const { id } = req.params;
const { direccionxenvio, estado, pago_id} = req.body;

const token = req.query.token;
const validateAdmin = jwt.verify(token, process.env.JWT_SECRET);
const isAdmin = validateAdmin.isAdmin

    try{
        const pedido = await Pedidos.findByPk(id);
        if(!pedido) throw "pedido no encontrado";

        if(isAdmin){
            let actualizarPedido ={};
            if(pedido.estado == "pidiendo"){
                if(direccionxenvio!=null) {
                    actualizarPedido.direccionxenvio = direccionxenvio;
                }
                if(pago_id!= null){
                    actualizarPedido.pago_id = pago_id;
                }
            } 
            if(estado!=null){
                actualizarPedido.estado = estado;
            }

            if(Object.keys(actualizarPedido).length == 0) throw "no se puede actualizar";
            res.actualizarPedido = actualizarPedido;
            return next();
        }

        if(pedido.estado == "pidiendo" && validateAdmin.user_id == pedido.usuario_id){

            let actualizarPedido ={};
            if(direccionxenvio!=null) {
                actualizarPedido.direccionxenvio = direccionxenvio;
            }
            if(pago_id!= null){
                actualizarPedido.pago_id = pago_id;
            }
        }else{
            throw "no se puede actualizar";
        }
        
    }catch(err){
        return res.status(500).json(err);
    }

}

module.exports = {validarActualizacionPedido};