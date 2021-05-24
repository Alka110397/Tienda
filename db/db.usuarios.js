const {DataTypes,Model}=require('sequelize');
const sequelize=require('../db/conexion')

const Usuarios= sequelize.define('usuario',{
    email:{
        type: DataTypes.STRING(50),
        allowNull:false
    },
    contrasena:{
        type:DataTypes.STRING(20),
        allowNull:false
    }
})

module.exports= Usuarios;