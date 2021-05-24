const productosServices = require('../../modelo/productos.listar')


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

    // app.get('/productos/:producto' , async (req,res)=> {
    //     let id = req.params.id
        
    // })

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
    app.delete('/productos/:id_meli', async (req,res)=>{
        let producto = req.params.id_meli
        console.log(producto);
        try {
            let resultado = await productosServices.eliminarProducto(producto)
            console.log(resultado)
            res.json('El producto fue eliminado  correctamente en la DB')
        }catch (err) {
            console.log(err)
            res.status(500).json({error: err.message})
        }
    })
    app.put('/productos/:id_meli',async(req,res)=>{
        let producto = req.params.id_meli
        let contenido=req.body
        try {
            let resultado = await productosServices.modificarProducto(producto,contenido)
            console.log(resultado)
            res.json('El producto fue actualizado  correctamente en la DB')
        }catch (err) {
            console.log(err)
            res.status(500).json({error: err.message})
        }
    })
}