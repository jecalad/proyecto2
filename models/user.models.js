const { DataTypes, Model } = require('sequelize');
const sequelize = require('../database/connection');

class Usuario extends Model {}

Usuario.init({
    id: { type: DataTypes.INTEGER, allowNull: false, primaryKey: true,autoIncrement:true },
    nombre: { type: DataTypes.STRING(100), allowNull: false, required: true},
    apellido: { type: DataTypes.STRING(100), allowNull: false, required: true},
    email: { type: DataTypes.STRING(150), allowNull: false, unique: true, required: true},
    fecha_creacion: { type: DataTypes.DATE, allowNull: false, defaultValue: Date.now},
    admin: { type: DataTypes.BOOLEAN, allowNull:false, defaultValue: false},
    activo: { type: DataTypes.BOOLEAN, allowNull: false, defaultValue: true}
}, {
  // Other model options go here
  sequelize, // We need to pass the connection instance
  modelName: 'usuario',  // We need to choose the model name
  timestamps:false
});

module.exports = Usuario;

