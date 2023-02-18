
let item_usuarios = document.getElementById('item_usuarios');
let item_productos = document.getElementById('item_productos');
let item_compras   = document.getElementById('item_compras');
let item_varios    = document.getElementById('item_varios');
let lista_cosas    = document.getElementById('lista_cosas');

item_usuarios.addEventListener('click', (e) =>{  
  agregarTick(e);
  quitarTick(item_productos);
  quitarTick(item_compras);
  quitarTick(item_varios);    

  lista_cosas.innerHTML = '';
})

item_productos.addEventListener('click', (e) =>{  
  agregarTick(e);
  quitarTick(item_usuarios);
  quitarTick(item_compras);
  quitarTick(item_varios);

  cargarListaProductos();
})

item_compras.addEventListener('click', (e) =>{  
  agregarTick(e);
  quitarTick(item_usuarios);
  quitarTick(item_productos);
  quitarTick(item_varios);

  lista_cosas.innerHTML = '';
})

item_varios.addEventListener('click', (e) =>{  
  agregarTick(e);
  quitarTick(item_usuarios);
  quitarTick(item_productos);
  quitarTick(item_compras);

  lista_cosas.innerHTML = '';
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

async function cargarListaProductos() {
  let response = await fetch('/api/productos');
  let data = await response.json();
  let productos = data.result; 
  console.log(productos);

  lista_cosas.innerHTML = '';
  let lista = '';
  productos.forEach(prod => {
    lista += cardProducto(prod);
  });
  lista_cosas.innerHTML = lista;
}

function cardProducto(producto){
  return `
      <div class="w-full">
        <img class="w-full h-[120px] object-cover rounded-lg overflow-x-hidden" src="${producto.foto}" alt="${producto.nombre}">
        <div class="w-full flex items-center justify-between mt-2 px-1">
          <p class="text-lg font-bold text-white">${producto.nombre}</p>          
          <a class="w-[25px] h-[25px] hover:bg-white hover:rounded-full duration-300 flex items-center justify-center" href="#"> 
            <img class="w-[20px] h-[20px] object-cover" src="/assets/edit.png" alt="Edit"> 
          </a>
        </div>        
      </div>      
  `;
}