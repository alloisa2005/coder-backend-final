
const socket = io();
let msj_usr = document.getElementById('msj_usr');
let user_id = document.getElementById('user_id');
let msj_list = document.getElementById('msj_list');

socket.on('msj-lista', data => {
  msj_list.innerHTML = '';
  let lista = '';
  for (let i = 0; i < data.length; i++) {
    const element = data[i];
    if(element.user === user_id.innerText){
      lista += `<p>${element.user}</p>`
    }
  }
  msj_list.innerHTML = lista; 
});

// Cuando se envia un msj en el chat (Tecla ENTER)
msj_usr.addEventListener('keyup', (e) => {
  if(e.key === 'Enter'){       
    socket.emit('message', {userId: user_id.innerText.trim(), msg: msj_usr.value});
    msj_usr.value = '';         
  }
});