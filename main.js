function Producto(nombre, precio) {
    this.nombre = nombre;
    this.precio = precio;
}


const carrito = JSON.parse(localStorage.getItem('carrito')) || [];
let total = parseFloat(localStorage.getItem('total')) || 0;

function agregarProducto() {
    const nombre = document.getElementById("producto").value;
    const precio = parseFloat(document.getElementById("precio").value);

    if (validarEntradas(nombre, precio)) {
        const producto = new Producto(nombre, precio);
        carrito.push(producto);

        total += precio;

        actualizarCarrito();
        limpiarEntradas();
        actualizarTotal();
        guardarEnLocalStorage();

        
        Toastify({
            text: "Producto agregado al carrito",
            duration: 3000,
            close: true,
            gravity: "bottom", 
            position: "center", 
        }).showToast();
    }
}


function vaciarCarrito() {
    carrito.length = 0;
    total = 0;
    actualizarCarrito();
    actualizarTotal();
    guardarEnLocalStorage();
}

function actualizarCarrito() {
    const listaProductos = document.getElementById("listaProductos");
    listaProductos.innerHTML = "";

    carrito.forEach(function (producto, index) {
        const li = document.createElement("li");
        li.textContent = `${producto.nombre} - $${producto.precio.toFixed(2)}`;
        listaProductos.appendChild(li);
    });
}



function validarEntradas(nombre, precio) {
    const mensajeError = document.getElementById("mensajeError");

    if (nombre && !isNaN(precio) && precio > 0) {
        mensajeError.style.display = "none";
        return true;
    } else {
        mensajeError.textContent = "Por favor, ingresa un nombre y un precio válido.";
        mensajeError.style.display = "block";
        return false;
    }
}

function limpiarEntradas() {
    document.getElementById("producto").value = "";
    document.getElementById("precio").value = "";
}

function actualizarTotal() {
    document.getElementById("total").textContent = "Total: $" + total.toFixed(2);
}

function guardarEnLocalStorage() {
    localStorage.setItem('carrito', JSON.stringify(carrito));
    localStorage.setItem('total', total.toFixed(2));
}


document.getElementById("agregarProducto").addEventListener("click", agregarProducto);
document.getElementById("vaciarCarrito").addEventListener("click", vaciarCarrito);
document.getElementById("buscar").addEventListener("click", buscarProducto);


document.addEventListener("DOMContentLoaded", function () {
    actualizarCarrito();
    actualizarTotal();
});
let listado = document.getElementById("listado");


function cargarProductosIniciales() {
    const productosIniciales = [
        { "id": 1, "nombre": "campera", "precio": 90000 },
        { "id": 2, "nombre": "pantalon", "precio": 50000 },
        { "id": 3, "nombre": "camiseta", "precio": 45000 },
        { "id": 4, "nombre": "remera", "precio": 30000 }
    ];

    productosIniciales.forEach((producto) => {
        const productoNuevo = new Producto(producto.nombre, producto.precio);
        carrito.push(productoNuevo);
    });

    guardarEnLocalStorage();
    actualizarCarrito();
    actualizarTotal();
}
cargarProductosIniciales();
