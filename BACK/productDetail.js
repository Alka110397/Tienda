let dataArticulos = JSON.parse(localStorage.getItem("DATA"));
let productoDetalle = JSON.parse(localStorage.getItem("INFOPRODUCTO"));
let productoMostrar;
dataArticulos.find(element => {
 if(element.id === productoDetalle){
    productoMostrar = element;
 } 
})

let imagen = document.getElementById('imagen')
imagen.setAttribute('src', productoMostrar.thumbnail)
console.log(productoMostrar)