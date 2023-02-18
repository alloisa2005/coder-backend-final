
let item_productos = document.getElementById('item_productos');
let item_compras = document.getElementById('item_compras');
let item_varios = document.getElementById('item_varios');

item_productos.addEventListener('click', (e) =>{  
  agregarTick(e);
  quitarTick(item_compras);
  quitarTick(item_varios);
})

item_compras.addEventListener('click', (e) =>{  
  agregarTick(e);
  quitarTick(item_productos);
  quitarTick(item_varios);
})

item_varios.addEventListener('click', (e) =>{  
  agregarTick(e);
  quitarTick(item_productos);
  quitarTick(item_compras);
})

function agregarTick(e) {
  let padre = e.target.parentElement;
  let imagen = padre.firstElementChild;  

  imagen.classList.remove('hidden')
  padre.classList.add('space-x-2')
}

function quitarTick(e) {
  let padre = e.parentElement;
  let imagen = padre.firstElementChild;  

  imagen.classList.add('hidden')
  padre.classList.remove('space-x-2')
}