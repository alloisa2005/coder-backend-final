
const socket = io();

let admin_id = document.getElementsByClassName('admin_id')[0];
let lista_usuarios = document.getElementById('lista_usuarios');
let msj_list = document.getElementById('msj_list');

let id_user = '';

leoUsuarios();

lista_usuarios.addEventListener('click', async (e) => {
  if(e.target.classList.contains('user_chat')){
    id_user = e.target.nextElementSibling.innerText;
    let response = await fetch(`/api/chat/mensajes/${id_user}`);
    let data = await response.json();
    
    let mensajes = data.result;
    msj_list.innerHTML = '';
    let lista = '';
    for (let i = 0; i < mensajes.length; i++) {
      const msj = mensajes[i];                

    /*
    <div class="w-full px-2 my-1 border-2 border-white rounded-md flex items-center">
          <p class="text-white text-lg text-right">${msj.mensaje}</p>
          <div class="flex-1"></div>
        </div>

        <div class="w-full px-2 my-1 border-2 border-white rounded-md flex items-center">            
            <div class="flex-1"></div>
            <p class="text-white text-lg">${msj.mensaje}</p>
          </div>
    */
      if(msj.receiver === null){
        lista += `
        <div class="w-full px-2 my-1 border-2 border-white rounded-md">      
          <p class="px-2 text-white text-lg text-left">${msj.mensaje}</p>
          <p class="px-2 pb-1 text-sm text-gray-300 text-left">Enviado: ${transformFecha(msj.createdAt)}</p>
        </div>
      `;
      } else {
        lista += `
        <div class="w-full px-2 my-1 border-2 border-white rounded-md">      
          <p class="px-2 text-white text-lg text-right">${msj.mensaje}</p>
          <p class="px-2 pb-1 text-sm text-gray-300 text-right">Enviado: ${transformFecha(msj.createdAt)}</p>
        </div>
        `;
      }
    }
    msj_list.innerHTML = lista;
  }
});

// Cuando se envia un msj en el chat (Tecla ENTER)
msj_usr.addEventListener('keyup', (e) => {
  if(e.key === 'Enter'){       
    socket.emit('message', {userId: id_user.trim(), mensaje: msj_usr.value.trim(), admin: 'S'});
    msj_usr.value = ''; 
    msj_list.innerHTML = '';        
  }
});

socket.on('lista-mensajes-admin', (mensajes) => {
  msj_list.innerHTML = '';  
});

async function leoUsuarios() {

  let response = await fetch('/api/chat/users');
  let data = await response.json();
  let usuarios = data.result;
  
  lista_usuarios.innerHTML = '';
  let lista = '';
  for (let i = 0; i < usuarios.length; i++) {
    const usuario = usuarios[i].user;
    //console.log(usuario);
    if(usuario._id !== admin_id.innerText.trim()){  // No muestro al usuario admin
      lista += `
        <div class="flex">
          <p class="user_chat p-1 text-white font-bold text-lg uppercase hover:cursor-pointer hover:bg-red-500">${usuario.nombre}</p>
          <p class="hidden">${usuario._id}</p>
        </div>
      `;
    }
  }
  lista_usuarios.innerHTML = lista;
}

function cardMensajeIzquierda(msj){
  return `
    <div class="my-2 border-2 rounded-lg">      
      <p class="p-2 text-white text-start">${msj.mensaje}</p>
    </div>
  `;
}

function cardMensajeDerecha(msj){
  return `
    <div class="my-2 border-2 rounded-lg">      
      <p class="p-2 text-white text-end">${msj.mensaje}</p>
    </div>
  `;
}

function transformFecha(fecha) {
  let fch = fecha.split('T')[0];
  fch = fch.split('-');
  return `${fch[2]}/${fch[1]}/${fch[0]}`;  
}