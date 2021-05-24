const sequelize=require('../../db/conexion');

module.exports=class Usuario{
    constructor(datosUsuario){
        this.datosUsuario=datosUsuario
    }
    async listar(){
    console.log( 'metodo'+this.datosUsuario);
    let resultado =await sequelize.query('SELECT * FROM usuario')
    //console.log(resultado[0][0])
    let solucion =resultado[0][0]
    console.log(solucion)
    return solucion
    }
    async alta(){  
    }
}