const dataUsuario=require('../../controlador/controlador.login')
const usuarioServices = require('../../modelo/datosLogin')

module.exports=async(app)=>{
    app.get('/login',async(req,res)=>{
        let datosUsuarios=req.body
        console.log(datosUsuarios);
        try {
            let resultado = await dataUsuario.login(datosUsuarios)
            res.json(resultado)
        }catch (err) {
            console.log(err)
            res.status(500).json({error: err.message})
        }
    })

    app.post('/newusuario', async (req, res)=>{
        let usuarioNuevo = req.body
        try {
            let resultado = await dataUsuario.crearUsuario(usuarioNuevo)
            res.status(200).json('Usuario creado correctamente')
        }catch (err){
            console.log(err)
            res.status(500).json('Este usuario ya existe')
        }

    })

    app.delete('/usuario/:email', async (req,res)=>{
        let usuario = req.params.email
        console.log(usuario);
        try {
            let resultado = await usuarioServices.eliminarUsuario(usuario)
            console.log(resultado)
            res.json('El usuario fue eliminado  correctamente en la DB')
        }catch (err) {
            console.log(err)
            res.status(500).json({error: err.message})
        }
    })


}