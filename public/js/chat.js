
const socket = io();
let input_msj = document.getElementById('input_msj');

// Cuando se envia un msj en el chat (Tecla ENTER)
input_msj.addEventListener('keyup', (e) => {
  if(e.key === 'Enter'){    
    socket.emit('message', input_msj.value);        
    input_msj.value = '';         
  }
});