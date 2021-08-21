const express = require('express');
const router = express.Router();
const { crearPedido, listarPedido, listarPedidos, actualizarPedido } = require('../controllers/pedidos.controller');
//Middlewares
const { validacionesUsuarios } = require('../middleware/pedidos/usuarios.middleware');
const { validateAdmin } = require('../middleware/usuarios/validateAdmin.middleware');
const { validarActualizacionPedido } = require('../middleware/pedidos/updatePedidos.middleware');

router.post('/', validacionesUsuarios,   async (req, res)=>{
    const { usuario_id , producto_id, pago_id, direccion, cantidad} = req.body;
    try{
        const pedido = await crearPedido(usuario_id, producto_id, pago_id, direccion, cantidad);
        res.status(200).json(pedido);
    }catch(err){
        res.status(500).json({"error": err})
    }
});

router.get('/', validateAdmin, async (req, res)=>{
    try{
        const pedidos = await listarPedidos();
        res.status(200).json(pedidos);
    }catch(err){
        throw err;
    }
});

router.get('/:id', async(req, res)=>{

    const id = parseInt(req.params.id);
    
    try{
        const pedido = await listarPedido(id);
        res.status(200).json(pedido);
    }catch(err){
        res.status(500).json({"error": err});
    }
});

router.patch('/:id', validarActualizacionPedido, async(req, res)=>{

    const { id } = req.params;

    try{
        await actualizarPedido(res.actualizarPedido, id);
        res.status(200).json({message: 'pedidos actualizado'})
    }catch(err){
        throw res.status(500).json(err);
    }
});

module.exports = router;