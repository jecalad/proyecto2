const { DataTypes, Model } = require('sequelize');
const sequelize = require('../database/connection');

class Pedido extends Model {}

Pedido.init({
    id: { type: DataTypes.INTEGER, allowNull: false, primaryKey: true,autoIncrement:true},
    estado: { type: DataTypes.ENUM('pidiendo','preparacion','enviando','entregado','cerrado', 'cancelado'), allowNull: false, required: true, defaultValue: "pidiendo"},
    direccionxenvio: { type: DataTypes.STRING(100), allowNull: false, required: true},
    total: { type: DataTypes.FLOAT, allowNull: false, required: true, defaultValue:0}
},{
    sequelize,
    modelName: "pedidos",
    timestamps:false
});

module.exports = Pedido;