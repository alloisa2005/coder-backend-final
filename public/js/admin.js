
let item_usuarios = document.getElementById('item_usuarios');
let item_productos = document.getElementById('item_productos');
let item_compras   = document.getElementById('item_compras');
let item_varios    = document.getElementById('item_varios');
let lista_cosas    = document.getElementById('lista_cosas');

lista_cosas.addEventListener('click', async (e) => {
  if(e.target.classList.contains('img_edit')){
    let card_container = e.target.parentElement.parentElement.parentElement;
    let id_prod = card_container.firstElementChild.innerText.trim();
    let response = await fetch(`/api/productos/${id_prod}`);
    let data = await response.json();    

    let producto = data.result;
    //console.log(producto.nombre);
    swalEdit(producto);
    
  }
});

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
  //console.log(productos);

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
        <p class="hidden prod_id">${producto._id}</p>
        <img class="w-full h-[120px] object-cover rounded-lg overflow-x-hidden" src="${producto.foto}" alt="${producto.nombre}">
        <div class="w-full flex items-center justify-between mt-2 px-1">
          <p class="text-lg font-bold text-white">${producto.nombre}</p>          
          <a class="w-[25px] h-[25px] hover:bg-white hover:rounded-full duration-300 flex items-center justify-center" href="#"> 
            <img class="img_edit w-[20px] h-[20px] object-cover" src="/assets/edit.png" alt="Edit"> 
          </a>
        </div>        
      </div>      
  `;
}

async function swalEdit(producto) {
  Swal.fire({
    title: 'Editar Producto',
    html: `     
      <div>
        <input type="hidden" id="id_prod" class="swal2-input" placeholder="ID Producto" readonly value="${producto._id}">
      </div>   
      <div>
        <label>Nombre:</label><input type="text" id="nombre" class="swal2-input" placeholder="Nombre" readonly value="${producto.nombre}">
      </div>
      <div>
        <label>Descripción:</label><input type="text" id="descripcion" class="swal2-input" placeholder="Descripción" readonly value="${producto.descripcion}">
      </div>
      <div>
        <label>Precio:</label><input type="text" id="precio" class="swal2-input" placeholder="Precio" value="${producto.precio}">
      </div>
      <div>
        <label>Stock:</label><input type="text" id="stock" class="swal2-input" placeholder="Stock" value="${producto.stock}">        
      </div>
    `,
    confirmButtonText: 'Editar',
    showCancelButton: true,
    focusConfirm: false,
    preConfirm: () => {
      const id_prod = Swal.getPopup().querySelector('#id_prod').value;
      const nombre = Swal.getPopup().querySelector('#nombre').value;
      const descripcion = Swal.getPopup().querySelector('#descripcion').value;
      const precio = parseFloat( Swal.getPopup().querySelector('#precio').value )
      const stock = parseInt( Swal.getPopup().querySelector('#stock').value )
      if (!precio || precio <= 0 || !stock || stock <= 0) {
        Swal.showValidationMessage(`Verifique precio y/o stock`)
      }
      return { id_prod, nombre, precio, descripcion, stock }
    }
  }).then((result) => {
    if(result.isConfirmed){      
      editProduct(result.value.id_prod, result.value.precio, result.value.stock);         
    } 
  })
}

async function editProduct(id, precio, stock){
  const requestOptions = {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ precio, stock })
  };

  const response = await fetch(`/api/productos/${id}`, requestOptions);
  const data = await response.json();

  if(data.status === 'OK') {
    Swal.fire("Producto modificado con éxito", nombre, "success", {
      button: "Aceptar",
    }); 
  }
}