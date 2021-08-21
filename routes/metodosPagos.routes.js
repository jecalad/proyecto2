const express = require('express');
const router = express.Router();
const {listarMetodosPago, crearMetodoPago, listarUnMetodoPago, borrarPago, actualizarPago} = require('../controllers/pagos.controller');
const {validateAdmin} = require('../middleware/usuarios/validateAdmin.middleware');

//Get all payment methods
router.get('/', async (req, res)=>{

    try{
        const metodos = await listarMetodosPago();
        res.status(200).json(metodos);
    }catch(err){
        res.status(500).json({error: err});
    }
})

router.get('/:id', async (req, res)=>{
    const { id } = req.params;

    try{
        const pago = await listarUnMetodoPago(id);
        res.status(200).json(pago);
    }catch(err){
        res.status(500).json(err);
    }
});

router.post('/', validateAdmin, async (req, res)=>{
    const { tipo } = req.body;
    
    try{
        const pago = await crearMetodoPago(tipo);
        res.status(200).json(pago);
    }catch(err){
        res.status(500).json({"error": err});
    }
});

router.put('/:id', validateAdmin, async (req, res)=>{
    const { tipo } = req.body;
    const { id } = req.params;

    try{
        await actualizarPago(tipo, id);
        res.status(200).json({message: "Método de pago actualizado"});
    }catch(err){
        res.status(500).json(err);
    }
});

router.delete('/:id', validateAdmin, async (req, res)=>{
    const { id } = req.params;

    try{
        await borrarPago(id);
        res.status(200).json({ message: "Método de pago eliminado"})
    }catch(err){
        res.status(500).json(err);
    }
});

module.exports = router;