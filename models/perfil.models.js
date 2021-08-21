const { DataTypes, Model } = require('sequelize');
const sequelize = require('../database/connection');

class Perfil extends Model {}

Perfil.init({
    id: { type: DataTypes.INTEGER, allowNull: false, primaryKey: true,autoIncrement:true },
    nombre_usuario: { type: DataTypes.STRING(100), allowNull: false, unique: true, required: true},
    contrasena: { type: DataTypes.STRING(100), allowNull: false, required: true},
    direccion: { type: DataTypes.STRING(150), allowNull: true, defaultValue: null},
    pais: { type: DataTypes.STRING(50), allowNull: true, defaultValue: null},
    telefono: { type: DataTypes.BIGINT(12), allowNull:true, defaultValue: null}
}, {
  // Other model options go here
  sequelize, // We need to pass the connection instance
  modelName: 'perfil', // We need to choose the model name
  tableName: 'perfiles',
  timestamps:false
});

module.exports = Perfil;