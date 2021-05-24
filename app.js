const express = require("express");
const app = express();
require('dotenv').config();
const sequelize = require('./db/conexion')
const productosRoute = require('./app/vista/routes/productos.meli')
const cors = require("cors");
const rateLimit = require('express-rate-limit');
const midd=require('./app/controlador/middleware/mid')
const usuarios= require('./db/db.usuarios')
const vistaUsuarios= require('./app/vista/routes/listaUsuarios')
const vistaProductos=require('./app/vista/routes/vista.productos')


app.use(express.json());
//app.use(cors());  //CORS Global todas las apis
app.use(midd.limiter); //Limiter Global todas las apis

app.use((err,req,res,next)=>{
    if(err){
        console.log(err)
        if(!res.headersSend){
            res.status(500).json('error en el servidor'+ err.message)
        }
    }
    next()
})

async function inicioServidor() {
    try {
        //console.log(process.env.DB_USER)
        await usuarios.sync({alter:true})
        await sequelize.authenticate();
        console.log('Conexion con la DB correcta!')
        app.listen(process.env.PORT, function (){
            console.log(`Sistema iniciado en el puerto ${process.env.PORT}`)
        })
    }catch (err){
        console.log(err)
        console.log('No se pudo conectar con la DB')
    }
} 

inicioServidor();

productosRoute(app);
vistaUsuarios(app);
vistaProductos(app);
