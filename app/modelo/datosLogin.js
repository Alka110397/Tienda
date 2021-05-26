const sequelize = require("../../db/conexion")
const midd = require('../controlador/middleware/mid')

//let entrar=document.getElementById('btn-entrar')
module.exports=class LoginUsuario{
    constructor(email, contrasena){
        this.email=email,
        this.contrasena=contrasena
    }
    static async guardarUsuario(usuario){
        //localStorage.setItem("datosUsuario",JSON.stringify(usuario))
        console.log(usuario)
        let usuarioNuevo = [
            usuario.email,
            usuario.contrasena,
            1
        ]

        let busqueda = await sequelize.query(`SELECT * FROM dbo.usuario WHERE email = '${usuario.email}'`)
            if(busqueda[0][0] === undefined){
                let resultado = await sequelize.query(`INSERT INTO usuario (email, contrasena, estatus_id) VALUES (?,?,?)`,
                {replacements: usuarioNuevo, type: sequelize.QueryTypes.SELECT});
                console.log(resultado);
                return resultado
            }
            else{
                
                console.log("Este usuario ya existe");
                res.status(500, "Este usuario ya existe");
                //AQUI GUARDAREMOS CON LOCAL STORAGE EL WEB TOKEN 
                    
            }

       
           


    }
    static async recuperarUsuario(datos){
        /* let resultado=await JSON.parse(localStorage.getItem('datosUsuario')) */
        
            let resultado = await sequelize.query(`SELECT * FROM dbo.usuario WHERE email = '${datos.email}' AND contrasena = '${datos.contrasena}'`)
            if(resultado[0][0] === undefined){
                console.log("Email y/o contraseña es incorrecta", resultado)
                    //return token
                
            }
            else{
                
                console.log("Usuarios",resultado[0][0]);
                midd.generaToken(datos);
                //AQUI GUARDAREMOS CON LOCAL STORAGE EL WEB TOKEN 
                    
            }
            
            return resultado
}
}

module.exports.eliminarUsuario=async(usuario)=>{
    let resultado = await sequelize.query(`DELETE FROM usuario WHERE email = '${usuario}'`)
    console.log(resultado)
      let solucion = resultado[0][0]
      return solucion
}




