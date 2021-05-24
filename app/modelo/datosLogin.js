const sequelize = require("../../db/conexion")

//let entrar=document.getElementById('btn-entrar')
module.exports=class LoginUsuario{
    constructor(email, contrasena){
        this.email=email,
        this.contrasena=contrasena
    }
    static async guardarUsuario(usuario){
        localStorage.setItem("datosUsuario",JSON.stringify(usuario))
    }
    static async recuperarUsuario(){
        let resultado=await JSON.parse(localStorage.getItem('datosUsuario'))
        return resultado
    }
}
// entrar.addEventListener('click',(e)=>{
//      let correo =document.getElementById('inputEmail').value
//      let password=document.getElementById('inputPassword').value
//     LoginUsuario.guardarUsuario(new LoginUsuario())
//     login()
//     e.preventDefault()
// })



module.exports= login




