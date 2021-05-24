
const cors = require("cors");
const midd=require('../../controlador/middleware/mid')
module.exports= async (app)=>{
    
    app.get('/miAPI',midd.controlApiKey,(req,res) => {
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
}