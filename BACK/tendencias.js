const mejorVendido=(tendencias)=>{
    let tendencia1 = Math.floor(Math.random() * 50);
    let tendencia2 = Math.floor(Math.random() * 50);
    let tendencia3 = Math.floor(Math.random() * 50);
  
    const itemCarrusel1=document.getElementById('img1')
    itemCarrusel1.setAttribute('src',tendencias[tendencia1].thumbnail)
    const textoCarrusel=document.getElementById('precio-carrusel1').textContent=`$${tendencias[tendencia1].price}`
    const itemCarrusel2=document.getElementById('img2')
    itemCarrusel2.setAttribute('src',tendencias[tendencia2].thumbnail)
    const textoCarrusel2=document.getElementById('precio-carrusel2').textContent=`$${tendencias[tendencia2].price}`
    const itemCarrusel3=document.getElementById('img3')
    itemCarrusel3.setAttribute('src',tendencias[tendencia3].thumbnail)
    const textoCarrusel3=document.getElementById('precio-carrusel3').textContent=`$${tendencias[tendencia3].price}`
   
  }