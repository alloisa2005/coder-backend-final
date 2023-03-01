
let user_id = document.getElementsByClassName('user_id')[0];
let lista_usuarios = document.getElementById('lista_usuarios');
leoUsuarios();

async function leoUsuarios() {

  let response = await fetch('/api/chat/users');
  let data = await response.json();
  let usuarios = data.result;
  
  lista_usuarios.innerHTML = '';
  let lista = '';
  for (let i = 0; i < usuarios.length; i++) {
    const usuario = usuarios[i].user;
    //console.log(usuario);
    if(usuario._id !== user_id.innerText.trim()){  // No muestro al usuario admin
      lista += `
        <p class="p-1 text-white font-bold text-lg uppercase hover:cursor-pointer hover:bg-red-500">${usuario.nombre}</p>
      `;
    }
  }
  lista_usuarios.innerHTML = lista;
}