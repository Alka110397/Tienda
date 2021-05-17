const express = require("express");
const app = express();
require("dotenv").config();

const sequelize = require('./db/conexion')
const productosRoute = require('./routes/productos.routes')

const cors = require("cors");
const midd = require('./midd/midd.js');

app.use(express.json());
app.use(cors());  //CORS Global todas las apis
/* app.use(midd.limiter); */ //Limiter Global todas las apis

async function inicioServidor() {
    try {
        //console.log(process.env.DB_USER)
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
//Routes
productosRoute(app)

///CHECAR ESTO DE ABJO XD
app.get('/miAPI', cors(midd.corsOptions), midd.controlApiKey, (req,res) => {
  
    try {
        let miApi={
            "url": process.env.categorieItemsURL

        }
        res.send(miApi);

    }catch (error) {
        console.log('Error desde el get del app')
        console.log(error);
        res.status(400).json(error.message)
    }
});
