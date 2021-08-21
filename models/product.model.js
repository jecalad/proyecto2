const { DataTypes, Model } = require('sequelize');
const sequelize = require('../database/connection');

class Producto extends Model {}

Producto.init({
    id: { type: DataTypes.INTEGER, allowNull: false, primaryKey: true, autoIncrement: true},
    nombre: { type: DataTypes.STRING(100), allowNull: false, required: true, unique: true},
    categoria: { type: DataTypes.STRING(100), allowNull: false, required: true},
    precio: { type: DataTypes.FLOAT, allowNull: false, required: true},
    fecha_creacion: { type: DataTypes.DATE,allowNull: false, required: true, defaultValue: Date.now},
    stock: { type: DataTypes.INTEGER, allowNull: true, required: true, defaultValue:0},
    seccion: { type: DataTypes.ENUM('Plantas', 'Materas', 'Abono', 'Otros'), allowNull: false, required: true}
},{
    // Other model options go here
    sequelize, // We need to pass the connection instance
    modelName: 'producto',  // We need to choose the model name
    timestamps:false
});

module.exports = Producto;