
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
    swalEdit(producto);    
  }  

  if(e.target.classList.contains('img_add')){
    console.log(e.target);
    swalNew();
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
  lista_cosas.innerHTML = cardProductoInicial();
  let lista = '';
  productos.forEach(prod => {
    lista += cardProducto(prod);
  });
  lista_cosas.innerHTML += lista;
}

function cardProductoInicial(){
  return `
      <div class="w-full">
        <p class="hidden prod_id"></p>
        <img class="w-full h-[120px] object-contain rounded-lg overflow-x-hidden" src="/assets/no-product.png" alt="Add Product">
        <div class="w-full flex items-center justify-between mt-2 px-1">
          <p class="text-lg font-bold text-white">Agregar Producto</p>          
          <a class="w-[25px] h-[25px] hover:bg-white hover:rounded-full duration-300 flex items-center justify-center" href="#"> 
            <img class="img_add w-[20px] h-[20px] object-cover" src="/assets/add-icon.png" alt="Edit"> 
          </a>
        </div>        
      </div>      
  `;
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

async function swalNew() {
  Swal.fire({
    title: 'Nuevo Producto',
    html: `           
      <div>
        <label>Nombre:</label><input type="text" id="nombre" class="swal2-input" placeholder="Nombre">
      </div>
      <div>
        <label>Descripción:</label><input type="text" id="descripcion" class="swal2-input" placeholder="Descripción">
      </div>
      <div>
        <label>Código:</label><input type="text" id="codigo" class="swal2-input" placeholder="Código">
      </div>
      <div>
        <label>URL Img:</label><input type="text" id="foto" class="swal2-input" placeholder="URL Foto">
      </div>
      <div>
        <label>Precio:</label><input type="text" id="precio" class="swal2-input" placeholder="Precio">
      </div>
      <div>
        <label>Stock:</label><input type="text" id="stock" class="swal2-input" placeholder="Stock">        
      </div>
      <div>
        <label>Carrocería:</label><input type="text" id="carroceria" class="swal2-input" placeholder="Carrocería">        
      </div>
      <div>
        <label>Puertas:</label><input type="text" id="puertas" class="swal2-input" placeholder="Nro. Puertas">
      </div>
      <div>
        <label>Potencia:</label><input type="text" id="potencia" class="swal2-input" placeholder="Potencia">
      </div>
      <div>
        <label>Plazas:</label><input type="text" id="plazas" class="swal2-input" placeholder="Nro. Plazas">
      </div>
    `,
    confirmButtonText: 'Guardar',
    showCancelButton: true,
    focusConfirm: false,
    preConfirm: () => {      
      const nombre = Swal.getPopup().querySelector('#nombre').value;
      const descripcion = Swal.getPopup().querySelector('#descripcion').value;
      const codigo = Swal.getPopup().querySelector('#codigo').value;
      const foto = Swal.getPopup().querySelector('#foto').value;
      const precio = parseFloat( Swal.getPopup().querySelector('#precio').value )
      const stock = parseInt( Swal.getPopup().querySelector('#stock').value )

      const carroceria = Swal.getPopup().querySelector('#carroceria').value;
      const puertas = Swal.getPopup().querySelector('#puertas').value;
      const potencia = Swal.getPopup().querySelector('#potencia').value;
      const plazas = Swal.getPopup().querySelector('#plazas').value;

      if (!nombre || !descripcion || !codigo || !foto || !precio || precio <= 0 || !stock || stock <= 0 || !carroceria || !puertas || !plazas || !potencia) {
        Swal.showValidationMessage(`Complete los campos`)
      }
      return { nombre, descripcion, codigo, foto, precio, stock, carroceria, puertas, potencia, plazas}
    }
  }).then((result) => {
    if(result.isConfirmed){    
      addProduct(result.value.nombre, result.value.descripcion, result.value.codigo, result.value.foto, result.value.precio, result.value.stock, result.value.carroceria, result.value.puertas, result.value.potencia, result.value.plazas);         
    } 
  })
}

async function addProduct(nombre, descripcion, codigo, foto, precio, stock, carroceria, puertas, potencia, plazas){  
  const requestOptions = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ 
      nombre,
      descripcion,
      codigo, 
      foto,
      precio,
      stock,
      caracteristicas: { 
        carroceria,
        puertas,
        potencia,
        plazas
      }
     })
  };

  const response = await fetch(`/api/productos/`, requestOptions);
  const data = await response.json();  

  if(data.status === 'OK') {
    Swal.fire("Producto agregado con éxito", nombre, "success", {
      button: "Aceptar",
    }); 

    cargarListaProductos();
  }
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
