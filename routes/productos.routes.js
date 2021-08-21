const express = require('express');
const router = express.Router();
const {listarProductos, crearProducto, actualizarProducto, borrarProducto, listarUnProducto} = require('../controllers/productos.controller');
const { validarActualizacionProductos } = require('../middleware/productos/updateProductos.middleware');
const { validateAdmin } = require('../middleware/usuarios/validateAdmin.middleware');


router.get('/', async (req, res)=>{
    try{
        const productos = await listarProductos();
        res.status(200).json(productos);
    }catch(err){
        res.status(500).json({"error": err})
    }
});

router.get('/:id', async (req, res)=>{
    const { id } = req.params;
    try{
        const producto = await listarUnProducto(id);
        res.status(200).json(producto);
    }catch(err){
        res.status(500).json({"error": err})
    }
})

router.post('/', validateAdmin, async (req, res)=>{
    const { nombre, categoria, precio, stock, seccion } = req.body;

    try{
        const pdtoCreado = await crearProducto(nombre, categoria, precio, stock, seccion);
        res.status(201).json(pdtoCreado);
    }catch(err){
        res.status(500).json({ message: err});
    }
})

router.patch('/:id', validateAdmin, validarActualizacionProductos, async (req, res) =>{
    const { id } = req.params;

    try{
        await actualizarProducto(res.productoActualizar, id);
        res.status(201).json({ message: "Producto actualizado"})
    }catch(err){
        res.status(500).json({ message: err});
    }

});

router.delete('/:id', validateAdmin, async (req, res) =>{
    const { id } = req.params;

    try{
        await borrarProducto(id);
        res.status(200).json({ message: "Producto eliminado"});
    }catch(err){
        res.status(500).json({ message: err});
    }
});

module.exports = router;