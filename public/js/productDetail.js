
let prod_stock_el = document.getElementById('prod_stock_el');
let btn_add = document.getElementById('btn_add');
btn_add.addEventListener('click', addToCart);

async function addToCart(event) {
  let prod_id = document.getElementById('prod_id').innerText;
  let prod_foto = document.getElementById('prod_foto').src;
  let prod_nombre = document.getElementById('prod_nombre').innerText;
  let prod_precio = parseFloat(document.getElementById('prod_precio').innerText.replace('Precio ($):',''));
  let prod_desc = document.getElementById('prod_desc').innerText;
  let prod_codigo = document.getElementById('prod_codigo').innerText;
  let prod_stock = parseInt(document.getElementById('prod_stock').innerText);    

  let producto = { 
    product_id: prod_id,
    quantity: 1,
    price: prod_precio,
    nombre: prod_nombre,
    descripcion: prod_desc,
    codigo: prod_codigo,
    foto: prod_foto,
    stock: prod_stock
  }

  let response = await fetch('/api/carrito', {
    method: 'POST', 
    headers: {
      'Content-Type': 'application/json'
    }, 
    body: JSON.stringify({producto}) 
  });
  let data = await response.json();        

  let stock_prod = data.prod_updated.result.stock; //btn_add
  if(data.status === 'OK') {      
    prod_stock_el.innerText = `Stock: ${stock_prod}`
    // Si el stock es 0 (cero) oculto el botón de "Agregar al Carrito"
    if(stock_prod <= 0) {
      btn_add.classList.add('hidden');
    }
    swal(prod_nombre, "¡añadido al carrito!", "success", {
      button: "Aceptar",
    });
  }      
}