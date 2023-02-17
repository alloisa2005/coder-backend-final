
let compra_detail = document.getElementById('compra_detail');

let btn_ver_compra = document.getElementsByClassName('btn_ver_compra')
for (let i = 0; i < btn_ver_compra.length; i++) {
  const btn_compra = btn_ver_compra[i];  
  btn_compra.addEventListener('click', verCompra)
}



function verCompra(e) {
  e.preventDefault();

  let compra_card = e.target.parentElement.parentElement.parentElement;
  let cart_id = compra_card.getElementsByClassName('compra_id')[0].innerText;
  cargoListaCompra(cart_id);
}

async function cargoListaCompra(cart_id){
  // funcion para cargar los productos de la compra seleccionada
}