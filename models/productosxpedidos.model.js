const { DataTypes, Model } = require('sequelize');
const sequelize = require('../database/connection');

class ProductoxPedidos extends Model {};

ProductoxPedidos.init({
    id: { type: DataTypes.INTEGER, allowNull: false, primaryKey: true,autoIncrement:true},
    cantidad: { type: DataTypes.INTEGER, allowNull: false, required: true}
},{
    sequelize,
    modelName: "productosxpedidos",
    timestamps:false
});

module.exports = ProductoxPedidos;