const Usuario = require('./user.models');
const Perfil = require('./perfil.models');
const Producto = require('./product.model');
const ProductosxPedidos = require('./productosxpedidos.model');
const Pago = require('./pagos.model');
const Pedidos = require('./pedidos.model');

Usuario.hasOne(Perfil, 
  {
   foreignKey: 'user_id',
  
    onDelete: 'CASCADE',
    onUpdate: ' CASCADE'
  });
  Perfil.belongsTo(Usuario,
    {
      foreignKey: 'user_id'
    });

Producto.hasMany(ProductosxPedidos,{
    foreignKey: 'product_id',
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE'
});

Pedidos.hasMany(ProductosxPedidos,{
  foreignKey: 'pedido_id',
  onDelete: 'CASCADE',
  onUpdate: 'CASCADE'
});


Pago.hasOne(Pedidos,{
  foreignKey: 'pago_id',
  onDelete: 'CASCADE',
  onUpdate: 'CASCADE'
});

Usuario.hasOne(Pedidos,{
  foreignKey: 'usuario_id',
  onDelete: 'CASCADE',
  onUpdate: 'CASCADE'
});


module.exports = {Usuario, Perfil, ProductosxPedidos, Producto, Pago, Pedidos};