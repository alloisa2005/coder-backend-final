
const socket = io();

let msj_usr= document.getElementById('msj_usr');
let user_id = document.getElementsByClassName('user_id')[0];
let user_admin = document.getElementsByClassName('user_admin')[0];
let lista_mensajes= document.getElementById('lista_mensajes');

// Cuando se envia un msj en el chat (Tecla ENTER)
msj_usr.addEventListener('keyup', (e) => {
  if(e.key === 'Enter'){       
    socket.emit('message', {userId: user_id.innerText.trim(), mensaje: msj_usr.value.trim(), admin: user_admin.innerText.trim()});
    msj_usr.value = '';         
  }
});

socket.on('lista-mensajes', (mensajes) => {  

  lista_mensajes.innerHTML = '';
  let lista = '';  

  for (let i = 0; i < mensajes.length; i++) {
    const msj = mensajes[i];
    if(msj.receiver === null){ 
      lista += cardMensajeDerecha(msj);
    } else {
      lista += cardMensajeIzquierda(msj);
    }
  }
  lista_mensajes.innerHTML = lista;
});

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