let dataItems;
let urlMeli;
const seccionProductos=document.getElementById("seccion-productos")
const fragment=document.createDocumentFragment()
//API CONSIGUE UN URL PARA LLAMAR UNA API DE MERCADO LIBRE
async function getAPI() { 
  let res = await fetch("http://localhost:3000/miAPI");
  let endpointMeli = await res.json();
  urlMeli = await endpointMeli.url;
  console.log(urlMeli);
  getItems(urlMeli);
}

async function getItems(url) {
  let res = await fetch(url);
  let items = await res.json();
  dataItems = await items.results;
  localStorage.setItem("DATA", JSON.stringify(dataItems));
  mostrarProductos(dataItems);
  //mejorVendido(dataItems);
  console.log(dataItems);
}

getAPI();
//CREACION DE TARJETAS DINAMICAS
class Producto{
  constructor(idProducto,imagen,titulo,descripcion){
    this.idProducto=idProducto,
    this.imagen=imagen,
    this.titulo=titulo,
    this.descripcion=descripcion
  }
  crearProducto(productos){
    let contenedorProductos=document.createElement('div');
        contenedorProductos.className='row card'
        let imag=document.createElement('img')
        imag.setAttribute('src',productos.imagen)
        imag.setAttribute('class','card-img-top')
        contenedorProductos.appendChild(imag)
        let cuerpoCarta=document.createElement('div');
        cuerpoCarta.className='card-body'
        let titulo=document.createElement('h5')
        titulo.textContent=`$${productos.titulo}`
        titulo.className='card-title'
        let descripcion=document.createElement('p')
        descripcion.textContent=`${productos.descripcion.split(',',1)}`
        descripcion.className='descripcionProducto card-text'
        let contenedorBotones=document.createElement('div')
        contenedorBotones.className='contenedor-botones'
        let btnComprar=document.createElement('button')
        btnComprar.id=productos.idProducto
        btnComprar.className='btn btn-primary btn-compra'
        btnComprar.textContent='Comprar'
        let btnVerMas=document.createElement('button')
        btnVerMas.id=`verMas${productos.idProducto}`
        btnVerMas.className='btn btn-primary btn-ver-mas'
        btnVerMas.textContent='Ver mas'
        cuerpoCarta.appendChild(titulo)
        cuerpoCarta.appendChild(descripcion)
        contenedorBotones.appendChild(btnComprar)
        contenedorBotones.appendChild(btnVerMas)
        cuerpoCarta.appendChild(contenedorBotones)
        contenedorProductos.appendChild(cuerpoCarta)

        let clone= contenedorProductos.cloneNode(true)
        fragment.appendChild(clone)
  }
}

const product=new Producto();
const mostrarProductos=(dataItems)=>{
  dataItems.forEach((element , index )=> {
    let id_producto=element.id;
    let imagenes= element.thumbnail;
    let precio= element.price;
    let descripcion=element.title;
    let productos=new Producto(id_producto,imagenes,precio,descripcion)
    product.crearProducto(productos);
     
  });
  seccionProductos.appendChild(fragment)
 
}