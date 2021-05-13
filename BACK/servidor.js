const express = require("express");
const app = express();
require("dotenv").config();

const cors = require("cors");
const midd = require('./midd/midd.js');

app.use(express.json());
/* app.use(cors()); */ //CORS Global todas las apis
/* app.use(midd.limiter); */ //Limiter Global todas las apis

app.listen(process.env.PORT,()=>{
    console.log(`Servidor inicializado en http://${process.env.HOST}:${process.env.PORT}`);
});

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
