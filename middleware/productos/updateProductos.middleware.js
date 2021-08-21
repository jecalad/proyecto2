function validarActualizacionProductos(req, res, next){

    const { nombre, categoria, precio, stock, seccion } = req.body;

    let productoActualizar = {};

    if (nombre != null){
        productoActualizar.nombre = nombre;
    }
    if(categoria != null){
        productoActualizar.categoria = categoria;
    }
    if(seccion != null){
        productoActualizar.seccion = seccion;
    }
    if(stock != null){
        productoActualizar.stock = stock;
    }
    if(precio != null){
        productoActualizar.precio = precio;
    }
    res.productoActualizar = productoActualizar;
    next();
}

module.exports = {validarActualizacionProductos};