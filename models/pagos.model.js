const { DataTypes, Model } = require('sequelize');
const sequelize = require('../database/connection');

class Pago extends Model {}

Pago.init({
    id: { type: DataTypes.INTEGER, allowNull: false, primaryKey: true,autoIncrement:true },
    tipo: { type: DataTypes.STRING(100), allowNull: false, required: true, unique: true}
},{
    sequelize,
    modelName: "metodospago",
    timestamps:false
});

module.exports = Pago;