//Importar los modulos
const productosServices = require('../services/productos.services')


module.exports = (app)=> {

    app.get('/productos', async (req,res)=> {
        try {
            let resultado = await productosServices.listarProductos()
            res.json(resultado)
        }catch (err) {
            console.log(err)
            res.status(500).json({error: err.message})
        }
    });

    app.get('/productos/:producto' , async (req,res)=> {
        let id = req.params.id
        
    })

    app.post('/productos', async (req,res)=>{
        let producto = req.body
        console.log(producto);
        try {
            let resultado = await productosServices.nuevoProducto(producto)
            console.log(resultado)
            res.json('El producto fue guardado correctamente en la DB')
        }catch (err) {
            console.log(err)
            res.status(500).json({error: err.message})
        }
    })
}