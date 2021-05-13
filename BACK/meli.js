let dataItems;
let urlMeli;
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
  mejorVendido(dataItems);
  console.log(dataItems);
}

getAPI();
//CREACION DE TARJETAS DINAMICAS
let contenedorProductos=document.createElement('div');

contenedorProductos.id='contenedor-productos'
contenedorProductos.className='row card'

const seccionProductos=document.getElementById("seccion-productos")
seccionProductos.appendChild(contenedorProductos);
contenedorProductos=document.getElementById("contenedor-productos")
const fragment=document.createDocumentFragment()


const mostrarProductos=(datosItem)=>{
  //datosItem = datosItem.slice(0, 12);  
  datosItem.forEach((producto,index )=> {

        
        let i=index;
        //console.log(producto)
        let imagen=document.createElement('img')
        imagen.setAttribute('src',producto.thumbnail)
        imagen.setAttribute('class','card-img-top')
        let titulo=document.createElement('h5')
        titulo.textContent=`$${producto.price}`
        titulo.className='card-title'
        let descripcion=document.createElement('p')
        descripcion.textContent=`${producto.title.substr(0,90)} ...`
        descripcion.className='descripcionProducto card-text'
        let btnComprar=document.createElement('button')
        btnComprar.id=producto.id
        btnComprar.className='btn btn-primary btn-compra'
        btnComprar.textContent='Comprar'

        let clone= contenedorProductos.cloneNode(true)
        //let clone2= contenedorBotones.cloneNode(true)
        clone.id=i++;
        clone.appendChild(imagen);
        clone.appendChild(titulo);
        clone.appendChild(descripcion);
        clone.appendChild(btnComprar);
        //clone2.appendChild(btnAgregar); */
        fragment.appendChild(clone)
        //console.log(fragment)
  });
  seccionProductos.appendChild(fragment)
  seccionProductos.removeChild(contenedorProductos);

}


const mejorVendido=(tendencia)=>{
  
    const itemCarrusel1=document.getElementById('img1')
    itemCarrusel1.setAttribute('src',tendencia[0].thumbnail)
    const textoCarrusel=document.getElementById('precio-carrusel1').textContent=`$${tendencia[0].price}`
    const itemCarrusel2=document.getElementById('img2')
    itemCarrusel2.setAttribute('src',tendencia[15].thumbnail)
    const textoCarrusel2=document.getElementById('precio-carrusel2').textContent=`$${tendencia[15].price}`
    const itemCarrusel3=document.getElementById('img3')
    itemCarrusel3.setAttribute('src',tendencia[5].thumbnail)
    const textoCarrusel3=document.getElementById('precio-carrusel3').textContent=`$${tendencia[5].price}`
   
  }