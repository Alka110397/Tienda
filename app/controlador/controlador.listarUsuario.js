const usuario= require('../modelo/modelo.listaUsuarios')

module.exports.listarUsuarios= async (data)=>{
    try{
        let rst=new usuario(data)
        let resultado=await rst.listar();
        return resultado
    }catch(err){
        console.log('Error desde el modelo '+ err)
        throw new Error(({error:err.message}));
    }
}