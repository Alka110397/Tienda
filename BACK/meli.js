let dataItems;
let urlMeli;
const seccionProductos=document.getElementById("seccion-productos")
const fragment=document.createDocumentFragment()
//API CONSIGUE UN URL PARA LLAMAR UNA API DE MERCADO LIBRE
async function getAPI() {
  try{
    let res = await fetch("http://localhost:3000/miAPI");
    let endpointMeli = await res.json();
    urlMeli = await endpointMeli.url;
    console.log(urlMeli);
    getItems(urlMeli);
  }catch (err){
    console.log("Error desde miAPI", err);
  } 
  
}

async function getItems(url) {
  try{
    let res = await fetch(url);
    let items = await res.json();
    dataItems = await items.results;
    localStorage.setItem("DATA", JSON.stringify(dataItems));
    mostrarProductos(dataItems);
    mejorVendido(dataItems);
    agregarEnCarrito();
    verMas();
    //mejorVendido(dataItems);
    console.log(dataItems);
  }catch (err){
    console.log("Error al obtener los productos", err);
  }
  
}

async function setItems(url){
  try{
    let res = await fetch(url);
    let items = await res.json();
  }catch(err){
    console.log("Erro al guardar productos en la DB");
  }
}

getAPI();
//CREACION DE TARJETAS DINAMICAS
class Producto{
  constructor(idProducto,imagen,precio,descripcion){
    this.idProducto=idProducto,
    this.imagen=imagen,
    this.precio=precio,
    this.descripcion=descripcion
  }
  //Crea las tarjetas
  crearProducto(){
    let contenedorProductos=document.createElement('div');
        contenedorProductos.className='row card'
        let imag=document.createElement('img')
        imag.setAttribute('src', this.imagen)
        imag.setAttribute('class','card-img-top')
        contenedorProductos.appendChild(imag)
        let cuerpoCarta=document.createElement('div');
        cuerpoCarta.className='card-body'
        let precio=document.createElement('h5')
        precio.textContent=`$${this.precio}`
        precio.className='card-title'
        let descripcion=document.createElement('p')
        descripcion.textContent=`${this.descripcion.split(',',1)}`
        descripcion.className='descripcionProducto card-text'
        let contenedorBotones=document.createElement('div')
        contenedorBotones.className='contenedor-botones'
        let btnComprar=document.createElement('button')
        btnComprar.id=this.idProducto
        btnComprar.className='btn btnCard btn-primary btn-compra'
        btnComprar.textContent='Comprar'
        let detalle = document.createElement('a')
        detalle.className = 'detalle'
       /*  detalle.setAttribute('href', './productDetail.html') */
        let btnVerMas=document.createElement('button')
        btnVerMas.id=this.idProducto
        btnVerMas.className='btn btnCard btn-primary btn-ver-mas'
        btnVerMas.textContent='Ver mas'
        btnVerMas.setAttribute('disabled', true)
        cuerpoCarta.appendChild(precio)
        cuerpoCarta.appendChild(descripcion)
        contenedorBotones.appendChild(btnComprar)
        detalle.appendChild(btnVerMas)
        contenedorBotones.appendChild(detalle)
        cuerpoCarta.appendChild(contenedorBotones)
        contenedorProductos.appendChild(cuerpoCarta)

        let clone= contenedorProductos.cloneNode(true)
        fragment.appendChild(clone)
  }
  async guardarProducto(){
    let productoNuevo = [
      this.idProducto,
      this.descripcion,
      this.precio,
      this.imagen,
      new Date()
  ]
  /* const rawResponse = await fetch('https://localhost:3000/productos',{ method: 'POST', body: productoNuevo });
  const content = await rawResponse.json(); */
  
  
  }
}
//Muestra las tarjetas
const mostrarProductos=(dataItems)=>{
  dataItems.forEach((element , index )=> {
    let id_producto=element.id;
    let imagen= element.thumbnail;
    let precio= element.price;
    let descripcion=element.title;
    let producto=new Producto(id_producto,imagen,precio,descripcion)
    producto.crearProducto();
    producto.guardarProducto(element);
  });
  seccionProductos.appendChild(fragment)

  
 
}

//Listener boton Comprar
const agregarEnCarrito = () =>{

  let enCarrito;

  if(JSON.parse(localStorage.getItem("CARRITO"))){
    enCarrito = JSON.parse(localStorage.getItem("CARRITO"))
  }
  else{
    enCarrito = new Array();
  }

  var botonesCompra = document.getElementsByClassName('btn-compra')
  
  for(let i=0; i<botonesCompra.length ;i++){
    botonesCompra[i].addEventListener('click',(response)=>{
     
      enCarrito.push(botonesCompra[i].id)
      localStorage.setItem("CARRITO", JSON.stringify(enCarrito));
      Swal.fire({
        position: 'center',
        icon: 'success',
        title: 'PRODUCTO GUARDADO',
        showConfirmButton: false,
        timer: 2000
      })
    
    })
  }
}
//Listener boton Ver mas
const verMas = () =>{

  var botonesVerMas = document.getElementsByClassName('btn-ver-mas')
  
  for(let i=0; i<botonesVerMas.length ;i++){
    botonesVerMas[i].addEventListener('click',(response)=>{
      localStorage.setItem("INFOPRODUCTO", JSON.stringify(botonesVerMas[i].id));
      
    })
  }
}


