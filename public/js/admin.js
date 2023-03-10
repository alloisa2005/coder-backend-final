
let item_usuarios  = document.getElementById('item_usuarios');
let item_productos = document.getElementById('item_productos');
let item_compras   = document.getElementById('item_compras');
let item_chat      = document.getElementById('item_chat');
let lista_cosas    = document.getElementById('lista_cosas');
let lista_compras  = document.getElementById('lista_compras');
let buscar_user    = document.getElementById('buscar_user');
let buscar_prod    = document.getElementById('buscar_prod');
let btn_buscar_compras = document.getElementById('btn_buscar_compras');
let lista_compras_header = document.getElementById('lista_compras_header');

lista_cosas.addEventListener('click', async (e) => {
  // Editar Producto
  if(e.target.classList.contains('img_edit_prod')){
    let card_container = e.target.parentElement.parentElement.parentElement;
    let id_prod = card_container.firstElementChild.innerText.trim();
    let response = await fetch(`/api/productos/${id_prod}`);
    let data = await response.json();    

    let producto = data.result;    
    swalEdit(producto);    
  }  

  // Nuevo Producto
  if(e.target.classList.contains('img_add_prod')){    
    swalNew();
  }

  // Editar Usuario
  if(e.target.classList.contains('img_edit_user')){
    let card_container = e.target.parentElement.parentElement.parentElement;
    let id_user = card_container.firstElementChild.innerText.trim();
    let response = await fetch(`/api/users/${id_user}`);
    let data = await response.json();        

    let user = data.usuario;    
    swalEditUser(user);    
  }  
});

lista_compras.addEventListener('click', detalleCompra);



item_usuarios.addEventListener('click', (e) =>{  
  agregarTick(e);
  quitarTick(item_productos);
  quitarTick(item_compras);
  quitarTick(item_chat);    
  lista_cosas.classList.remove('hidden');
  lista_compras.classList.add('hidden');

  buscar_user.classList.remove('hidden');
  buscar_prod.classList.add('hidden');

  cargarListaUsuarios();
})

item_productos.addEventListener('click', (e) =>{  
  agregarTick(e);
  quitarTick(item_usuarios);
  quitarTick(item_compras);
  quitarTick(item_chat);  
  lista_cosas.classList.remove('hidden');
  lista_compras.classList.add('hidden');

  buscar_user.classList.add('hidden');
  buscar_prod.classList.remove('hidden');
  cargarListaProductos();
})

item_compras.addEventListener('click', (e) =>{  
  agregarTick(e);
  quitarTick(item_usuarios);
  quitarTick(item_productos);
  quitarTick(item_chat);
  lista_cosas.classList.add('hidden');
  lista_compras.classList.remove('hidden');

  buscar_user.classList.add('hidden');
  buscar_prod.classList.add('hidden');

  lista_cosas.innerHTML = '';
  cargarListaCompras();
})

item_chat.addEventListener('click', (e) =>{  
  agregarTick(e);
  quitarTick(item_usuarios);
  quitarTick(item_productos);
  quitarTick(item_compras); 
  lista_cosas.classList.remove('hidden'); 
  lista_compras.classList.add('hidden');

  buscar_user.classList.add('hidden');
  buscar_prod.classList.add('hidden');

  lista_cosas.innerHTML = '';
  window.location.assign('/api/chat/admin');
})

buscar_user.addEventListener('keyup', buscarUsuario);

buscar_prod.addEventListener('keyup', buscarProd);

btn_buscar_compras.addEventListener('click', (e) => {
  let fch_desde = document.getElementById("fch_desde").value;
  let fch_hasta = document.getElementById("fch_hasta").value;
  leoCompras(fch_desde, fch_hasta);
});


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

///////////////// U S U A R I O S /////////////////
async function cargarListaUsuarios() {
  let response = await fetch('/api/users');
  let data = await response.json();
  let usuarios = data.usuarios; 

  lista_cosas.innerHTML = '';
  lista_cosas.innerHTML = cardUserInicial();
  let lista = '';
  usuarios.forEach(user => {
    lista += cardUser(user);
  });
  lista_cosas.innerHTML += lista; 
}

function cardUserInicial(){
  return `
      <div class="w-full border-2 rounded-md">
        <p class="hidden prod_id"></p>
        <img class="w-full h-[120px] object-contain rounded-lg overflow-x-hidden" src="/assets/add-user.png" alt="Add Product">
        <div class="w-full flex items-center justify-between mt-2 px-1">
          <p class="text-lg font-bold text-white">Agregar Usuario</p>          
          <a class="w-[25px] h-[25px] hover:bg-white hover:rounded-full duration-300 flex items-center justify-center" href="#"> 
            <img class="img_add_user w-[20px] h-[20px] object-cover" src="/assets/add-icon.png" alt="Edit"> 
          </a>
        </div>        
      </div>      
  `;
}

function cardUser(user){
  return `
      <div class="w-full ">
        <p class="hidden prod_id">${user._id}</p>
        <img class="w-full h-[120px] object-cover rounded-lg overflow-x-hidden aspect-video" src="${user.foto}" alt="${user.nombre}">
        <div class="w-full flex items-center justify-between mt-2 px-1">
          <p class="text-lg font-bold text-white">${user.nombre}</p>          
          <a class="w-[25px] h-[25px] hover:bg-white hover:rounded-full duration-300 flex items-center justify-center" href="#"> 
            <img class="img_edit_user w-[20px] h-[20px] object-cover" src="/assets/edit.png" alt="Edit"> 
          </a>
        </div>        
      </div>      
  `;
}

async function swalEditUser(usuario) {
  Swal.fire({
    title: 'Editar Usuario',
    html: `     
      <div>
        <input type="hidden" id="id_user" class="swal2-input" placeholder="ID User" readonly value="${usuario._id}">
      </div>   
      <div>
        <label>Nombre:</label><input type="text" id="nombre" class="swal2-input" placeholder="Nombre" value="${usuario.nombre}">
      </div>
      <div>
        <label>Email:</label><input type="email" id="email" class="swal2-input" placeholder="Email" value="${usuario.email}">
      </div>
      <div>
        <label>Direcci??n:</label><input type="text" id="direccion" class="swal2-input" placeholder="Direcci??n" value="${usuario.direccion}">
      </div>
      <div>
        <label>Tel??fono:</label><input type="text" id="telefono" class="swal2-input" placeholder="Tel??fono" value="${usuario.telefono}">        
      </div>
      <div>
        <label>Edad:</label><input type="number" id="edad" class="swal2-input" placeholder="Edad" value="${usuario.edad}">        
      </div>
    `,
    confirmButtonText: 'Editar',
    showCancelButton: true,
    focusConfirm: false,
    preConfirm: () => {
      const id_user = Swal.getPopup().querySelector('#id_user').value;
      const nombre = Swal.getPopup().querySelector('#nombre').value;
      const email = Swal.getPopup().querySelector('#email').value;
      const direccion = Swal.getPopup().querySelector('#direccion').value 
      const telefono = Swal.getPopup().querySelector('#telefono').value 
      const edad = parseInt( Swal.getPopup().querySelector('#edad').value )
      if (!nombre || edad <= 0 || !email || !direccion || !telefono ) {
        Swal.showValidationMessage(`Complete los datos`)
      }
      return { id_user, nombre, email, direccion, telefono, edad }
    }
  }).then((result) => {
    if(result.isConfirmed){            
      editUser(result.value.id_user, result.value.nombre, result.value.email, result.value.direccion, result.value.telefono, result.value.edad);
    } 
  })
}  

async function editUser(id_user, nombre, email, direccion, telefono, edad){
  const requestOptions = {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ nombre, email, direccion, telefono, edad })
  };

  const response = await fetch(`/api/users/${id_user}`, requestOptions);
  const data = await response.json();

  if(data.status === 'OK') {
    Swal.fire("Usuario modificado con ??xito", nombre, "success", {
      button: "Aceptar",
    }); 
    //cargarListaUsuarios();
  }
}

async function buscarUsuario(e) {
  let cadena = e.target.value.trim();

  if(cadena.length === 0) {
    cargarListaUsuarios();
  } else {
    let response = await fetch(`/api/users/buscar/${cadena}`)
    let data = await response.json();
    let usuarios = data.usuarios;

    lista_cosas.innerHTML = '';    
    let lista = '';
    usuarios.forEach(user => {
      lista += cardUser(user);
    });
    lista_cosas.innerHTML += lista;
  }
}

/////////////// P R O D U C T O S /////////////////
async function cargarListaProductos() {
  let response = await fetch('/api/productos');
  let data = await response.json();
  let productos = data.result; 

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
            <img class="img_add_prod w-[20px] h-[20px] object-cover" src="/assets/add-icon.png" alt="Edit"> 
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
            <img class="img_edit_prod w-[20px] h-[20px] object-cover" src="/assets/edit.png" alt="Edit"> 
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
        <label>Descripci??n:</label><input type="text" id="descripcion" class="swal2-input" placeholder="Descripci??n">
      </div>
      <div>
        <label>C??digo:</label><input type="text" id="codigo" class="swal2-input" placeholder="C??digo">
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
        <label>Carrocer??a:</label><input type="text" id="carroceria" class="swal2-input" placeholder="Carrocer??a">        
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
    Swal.fire("Producto agregado con ??xito", nombre, "success", {
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
        <label>Descripci??n:</label><input type="text" id="descripcion" class="swal2-input" placeholder="Descripci??n" readonly value="${producto.descripcion}">
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
    
    Swal.fire("Producto modificado con ??xito", nombre, "success", {
      button: "Aceptar",
    }); 
  }
}

async function buscarProd(e) {
  let cadena = e.target.value.trim();

  if(cadena.length === 0) {
    cargarListaProductos();
  } else {
    let response = await fetch(`/api/productos/name/${cadena}`)
    let data = await response.json();
    let productos = data.result;    
    
    lista_cosas.innerHTML = '';    
    let lista = '';
    productos.forEach(prod => {
      lista += cardProducto(prod);
    });
    lista_cosas.innerHTML += lista; 
  }
}

///////////////// C O M P R A S /////////////////
async function cargarListaCompras() {  
  cargarFechas();
  lista_cosas.innerHTML = '';    

  let fch_desde = document.getElementById("fch_desde").value;
  let fch_hasta = document.getElementById("fch_hasta").value;
  leoCompras(fch_desde, fch_hasta);
  
  

  //let response = await fetch('/api/compras/busqueda/fechas');
  //let data = await response.json();

  /* let lista = '';
  usuarios.forEach(user => {
    lista += cardUser(user);
  });
  lista_cosas.innerHTML += lista;  */
}

async function leoCompras(fch_desde, fch_hasta) {  
  lista_compras_header.innerHTML = '';

  let response = await fetch(`/api/compras/busqueda/fechas/?desde=${fch_desde}&hasta=${fch_hasta}`);
  let data = await response.json();
  let compras = data.compras;
  let lista_compras = '';
  compras.forEach( compra => {        
    lista_compras += cardCompra(compra);
  });
  lista_compras_header.innerHTML = lista_compras;
}

async function detalleCompra(e) {  
  if(e.target.classList.contains('btn_eye')){  // Si clickeamos sobre el "ojo"
    let id_compra = e.target.parentElement.firstElementChild.firstElementChild.innerText.trim();

    let response = await fetch(`/api/compras/detail/${id_compra}`);
    let compra = await response.json();    

    let modal_compra = document.getElementById('modal_compra');
    modal_compra.innerHTML = creoModal(compra); 
    modal_compra.classList.remove('hidden');        

    let btn_cerrar_modal = document.getElementById('btn_cerrar_modal');
    btn_cerrar_modal.addEventListener('click', (e) => {
      document.getElementById('modal_compra').classList.add('hidden');
    });

  }  
}

function cargarFechas() {

  var today = new Date();
  var dd = today.getDate();
  var mm = today.getMonth() + 1; //Enero es 0
  var yyyy = today.getFullYear();

  if (dd < 10) {
    dd = '0' + dd;
  }

  if (mm < 10) {
    mm = '0' + mm;
  } 
      
  today = yyyy + '-' + mm + '-' + dd;
  document.getElementById("fch_desde").value = today;
  document.getElementById("fch_hasta").value = today;
  document.getElementById("fch_desde").setAttribute("max", today);
  document.getElementById("fch_hasta").setAttribute("max", today);

}

function cardCompra(compra) {
  /* let fch = compra.createdAt.split('T')[0];
  fch = fch.split('-');
  let fecha = `${fch[2]}/${fch[1]}/${fch[0]}`;   */

  return `
    <div class="w-full my-3 px-6 py-2 flex items-center border-2 rounded-lg flex justify-between">
      <div class="flex items-center">
        <p class="hidden id_compra">${compra._id}</p>
        <img src="${compra.user.foto}" class="w-[50px] h-[50px] rounded-full object-cover mr-8" alt="Buscar Compras">
        <p class="text-white text-2xl font-bold mr-10">${compra.user.nombre}</p>
        <p class="text-white text-2xl font-bold mr-10">Fecha: <span class="text-red-400">${transformFecha(compra.createdAt)}</span></p>
        <p class="text-white text-2xl font-bold">Monto ($): <span class="text-red-400">${compra.cart.subTotal}</span></p>
      </div>
      <img src="/assets/eye.png" class="btn_eye w-[40px] object-cover hover:cursor-pointer" alt="Buscar Compras">
    </div>
  `;
}


////////////////// M O D A L //////////////////
function creoModal(compra) {
  return `
    <div class="w-[50%]  bg-white p-4 rounded-lg text-black flex flex-col">
      <p class="text-center text-2xl font-bold">Detalle de Compra</p>
      <div class="px-20 py-3 flex items-center justify-between text-lg">
        <p class="text-gray-600">Usuario: <span class="text-black font-bold">${compra.user.nombre}</span></p>
        <p class="text-gray-600">Fecha: <span class="text-black font-bold">${transformFecha(compra.createdAt)}</span></p>
        <p class="text-gray-600">Monto Total ($): <span class="text-black font-bold">${compra.cart.subTotal}</span></p>
      </div>
      <p class="text-gray-600 font-bold text-xl mb-2">Lista de Productos</p>
      <div>
        ${modalDetail(compra.cart.productos)}                
        <div class="w-full p-3">
          <p class="text-end text-xl font-bold">Total ($): ${compra.cart.subTotal}</p>
        </div>

        <div class="w-full flex justify-center">          
          <p id="btn_cerrar_modal" class='text-lg uppercase border-2 border-black text-center w-[30%] bg-white text-black hover:bg-black hover:text-white hover:shadow-xl duration-300 rounded-lg py-2 hover:cursor-pointer'>Cerrar</p>
        </div>
      </div>
    </div>
  `;
}

function modalDetail(productos) {  
  let lista = '';
  productos.forEach( p => {
    lista += `
      <div class="border-2 rounded-lg w-full px-3 py-1 mt-2 flex items-center justify-between">
        <div class="flex items-center space-x-2">
          <img class="w-[100px] object-cover aspect-video" src="${p.foto}" alt="${p.nombre}">
          <p>${p.nombre}</p>
        </div>
        <p>Cantidad: ${p.quantity}</p>
        <p>SubTotal ($): ${p.quantity * p.price}</p>
      </div>
    `;
  })
  return lista;
}

function transformFecha(fecha) {
  let fch = fecha.split('T')[0];
  fch = fch.split('-');
  return `${fch[2]}/${fch[1]}/${fch[0]}`;  
}

