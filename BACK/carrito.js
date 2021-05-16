let articulos = new Array();
let numeroArticulos = 0;
let dataArticulos = new Array();
let total = 0;
let articulosEnCarro = new Array();
dataArticulos = JSON.parse(localStorage.getItem("DATA"));

class Carrito {
    constructor (id_producto,imagen,precio,descripcion, cantidadProductos){
        this.id_producto = id_producto,
        this.imagen = imagen,
        this.precio = precio,
        this.descripcion = descripcion,
        this.cantidadProductos = cantidadProductos
    }

    meterProducto(){

        let productos=document.getElementById("numeroProductos");
       
        productos.textContent =`${numeroArticulos}`  
       
        let listaProductos= document.getElementById('lista-productos')
        let contenedor=document.createElement('div')
        
        listaProductos.appendChild(contenedor)
        const fragment=document.createDocumentFragment()
        console.log(articulos)
            
                let elementoLista=document.createElement('li')
                elementoLista.className='list-group-item d-flex justify-content-between lh-sm elementos'
                let titulo=document.createElement('h6')
                titulo.className="my-0"
                let contenedorInfo=document.createElement('div')
                contenedorInfo.className='infoProducto'
                titulo.textContent=this.descripcion
                let imagen=document.createElement('img')
                imagen.setAttribute('src',this.imagen)
                imagen.className='imgProducto'
                let precio=document.createElement('span')
                precio.className='text-muted precio'
                precio.textContent=`$${this.precio * this.cantidadProductos}` 
                let contenedorCantidad= document.createElement('div')
                contenedorCantidad.className = 'input-group divCantidad'
                let cantidad = document.createElement('input')
                cantidad.id = `input${this.id_producto}`
                cantidad.className = 'inputCantidad'
                cantidad.setAttribute('value', this.cantidadProductos);
                cantidad.setAttribute('type', 'number')
                cantidad.setAttribute('disabled', true)
                let cantidadAgregar = document.createElement('button')
                cantidadAgregar.id = this.id_producto
                cantidadAgregar.className = 'btn btn-outline-secondary btn-add'
                cantidadAgregar.setAttribute('type', 'button')
                cantidadAgregar.textContent = '+'
                let cantidadEliminar = document.createElement('button')
                cantidadEliminar.id = this.id_producto
                cantidadEliminar.className = 'btn btn-outline-secondary btn-substract'
                cantidadEliminar.textContent = '-'
                contenedorInfo.appendChild(imagen)
                contenedorInfo.appendChild(titulo)
                contenedorCantidad.appendChild(cantidad)
                contenedorCantidad.appendChild(cantidadAgregar)
                contenedorCantidad.appendChild(cantidadEliminar)
                elementoLista.appendChild(contenedorInfo)
                elementoLista.appendChild(contenedorCantidad)
                elementoLista.appendChild(precio)
                
                let clone=contenedor.cloneNode(true)
                
                clone.appendChild(elementoLista)
                fragment.appendChild(clone)
              
            listaProductos.appendChild(fragment)
            
            total = total + (this.precio * this.cantidadProductos);
          

    }
}

const mostrarCarrito=()=>{

    numeroArticulos = (JSON.parse(localStorage.getItem("CARRITO"))).length; 
       
    articulos = JSON.parse(localStorage.getItem("CARRITO"));
    let cantidadProductos = 0;

    if(dataArticulos !== null){
        dataArticulos.forEach((element,index) => {
          let i=index;
        
          if( articulos.find(element2 => element2 === element.id)) {
            articulosEnCarro.push(element);
          }
            
          
        })
    }
    console.log(articulosEnCarro);

    articulosEnCarro.forEach((element , index )=> {
      cantidadProductos = 0;
      let id_producto=element.id;
      let imagen= element.thumbnail;
      let precio= element.price;
      let descripcion=element.title;
      articulos.filter(element2 => {
        if(element2 === element.id){
          cantidadProductos++
        
        } 
      })
      let carrito=new Carrito(id_producto,imagen,precio,descripcion, cantidadProductos)
      carrito.meterProducto();
      
      
  
     
    });
    //Agregamos los listeners a los botones
    var botonesAgregar = document.getElementsByClassName('btn-add')
    for(let i=0; i<botonesAgregar.length ;i++){
      botonesAgregar[i].addEventListener('click',(response)=>{
    
    
     articulos.push(botonesAgregar[i].id);
     localStorage.setItem("CARRITO", JSON.stringify(articulos))
  
     location.reload();
     
     })
    }

    var botonesQuitar = document.getElementsByClassName('btn-substract')
    for(let i=0; i<botonesQuitar.length ;i++){
      botonesQuitar[i].addEventListener('click',(response)=>{
    
        var j = articulos.indexOf( botonesQuitar[i].id );
 
        if ( j !== -1 ) {
            articulos.splice( j, 1 );
        }
        localStorage.setItem("CARRITO", JSON.stringify(articulos))

     location.reload();
    
     })
    }
   
  }


         
mostrarCarrito();

//CHECKOUT
/* if(window.location.href.indexOf('checkout') > -1){
   
    }
     */
    //BOTON DE COMPRA
    let buttonPagar = document.getElementById('finalizarCompra');
    buttonPagar.addEventListener('click', () =>{
      Swal.fire({
        title: 'Estan correctos tus productos?',
        text: "Pasaremos a capturar tu direccion de envio!",
        icon: 'question',
        showCancelButton: true,
        cancelButtonText: 'No!',
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Si, continuar!'
      }).then((result) => {
        if (result.isConfirmed) {
          Swal.fire(
            'Guardado!',
            '',
            'success'
          )
        }
      })
    })

    
    let aPagar = document.getElementById('totalPagar');
    aPagar.textContent = `$${total}`;