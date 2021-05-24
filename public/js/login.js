let crearCuenta=document.getElementById('crearCuenta')
let seccionLogin=document.getElementById('iniciar-sesion')
let seccionRegistro=document.getElementById('crear-cuenta')
seccionLogin.style.display='block'

crearCuenta.addEventListener('click',()=>{
    if(seccionLogin.style.display=='block'){
        seccionLogin.style.display='none'
        seccionRegistro.style.display='block'
    }
   
})