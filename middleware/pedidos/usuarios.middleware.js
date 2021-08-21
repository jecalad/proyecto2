 function validacionesUsuarios (req, res, next){
    const { usuario_id , producto_id, pago_id, direccion, cantidad} = req.body;

    if(usuario_id == "" || producto_id == "" || pago_id == "" || direccion == "" || cantidad == "") 
    throw res.status(500).json("empty fields not allowed")
    next();
    return
}

module.exports = {validacionesUsuarios};