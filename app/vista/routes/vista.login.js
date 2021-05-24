const dataUsuario=require('../../controlador/controlador.login')
module.exports=async(app)=>{
    app.get('/login',async(req,res)=>{
        let datosUsuarios=req.body
        try {
            let resultado = await dataUsuario.login(datosUsuarios)
            res.json(resultado)
        }catch (err) {
            console.log(err)
            res.status(500).json({error: err.message})
        }
    })
}