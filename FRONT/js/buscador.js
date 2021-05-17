let botonBuscar = document.getElementById('btn-buscar');

const resultadoBusqueda=document.getElementById('busqueda');
const todosProductos=document.getElementById('seccion-productos');


botonBuscar.addEventListener('click',(e)=>{

    if(document.getElementById('buscador').value === ""){
        location.reload();
    }

    let encontrado = false;

    resultadoBusqueda.innerHTML="";
    
    console.log(document.getElementById('buscador').value);
      let busqueda = new Array();
      JSON.parse(localStorage.getItem("DATA")).filter(element => {
      let cadena = element.title.toLowerCase()
      let texto = document.getElementById('buscador').value.toLowerCase()
      let posicion = cadena.indexOf(texto);
      if (posicion !== -1){
        busqueda.push(element);
        encontrado = true; 
      } 
      
    })
    todosProductos.innerHTML="";
    mostrarProductos(busqueda);
    agregarEnCarrito();
    verMas();
    //console.log(busqueda);

    if(encontrado !== true ){
      console.log('entre')
      resultadoBusqueda.innerHTML=`
      <h1>NO ENCONTRAMOS LO QUE BUSCABAS</h1>`
    } 
    e.preventDefault();
});

