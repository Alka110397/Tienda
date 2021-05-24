const controladorUsuarios=require('../../controlador/controlador.listarUsuario')
module.exports=async(app)=>{
    app.get('/usuariosRegistrados/:metodo', async(req,res)=>{
        let data=req.params.metodo
        try{
            let resultado = await controladorUsuarios.listarUsuarios(data)
            //console.log(resultado)
        }catch(err){
            res.status(400).json('Error en la consulta')
        }
    })
}