const loginUsuarios=require('../modelo/datosLogin')

module.exports.login= async function(datos){
    try{
        let data= new loginUsuario(datos)
        await loginUsuarios.guardarUsuario(data)
        let datosLogin= await data.recuperarUsuario()
        console.log(datosLogin)
        return datosLogin
    }catch(err){
        console.log('Error desde el modelo '+ err)
        throw new Error(({error:err.message}));
    }
    
    // let resultado=await sequelize.query(`SELECT * FROM usuario where usuario.email = ${datosLogin.email} AND usuario.contrasena= ${datosLogin.contrasena}`)    
    // if(resultado!== null){
    //     return resultado
    // }else{
    //     console.log('resultado no encontrado')
    // }
}