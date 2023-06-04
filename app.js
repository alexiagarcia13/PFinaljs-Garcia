class Producto {
  constructor(id, nombre, precio, stock, img, descripcion, alt) {
    this.id = id;
    this.nombre = nombre;
    this.cantidad = 1;
    this.precio = precio;
    this.stock = stock;
    this.img = img;
    this.descripcion = descripcion;
    this.alt = alt;
  }
}

class ProductoController {
  constructor() {
    this.listaProductos = [];
    this.contenedor_productos = document.getElementById("contenedor_productos");
  }

  async levantar_y_mostrar(controladorCarrito) {
    const resp = await fetch("productos.json");
    this.listaProductos = await resp.json();

    this.mostrarEnDOM();
    this.darEventoClickAProductos(controladorCarrito);
  }

  mostrarEnDOM() {
    this.listaProductos.forEach((producto) => {
      this.contenedor_productos.innerHTML += `
        <div class="card border-primary" style="width: 18rem;">
            <img src="${producto.img}" class="card-img-top" alt="${producto.alt}">
            <div class="card-body">
                <h5 class="card-title">${producto.nombre}</h5>
                <p class="card-text">${producto.descripcion}</p>
                <p class="card-text">Precio: $${producto.precio}</p>
                <a href="#" id="cpu-${producto.id}" class="btn btn-primary">Añadir al carrito</a>
            </div>
        </div>`;
    });
  }

  darEventoClickAProductos(controladorCarrito) {
    this.listaProductos.forEach((producto) => {
      const btnAP = document.getElementById(`cpu-${producto.id}`);
      btnAP.addEventListener("click", () => {
        controladorCarrito.agregar(producto);
        controladorCarrito.guardarEnStorage();
        controladorCarrito.mostrarEnDOM();
        Toastify({
          text: `${producto.nombre} añadido!`,
          duration: 3000,
          gravity: "bottom",
          position: "right",
          style: {
            background: "linear-gradient(to right, #00b09b, #96c93d)",
          },
        }).showToast();
      });
    });
  }
}

class CarritoController {
  constructor() {
    this.precio_total = document.getElementById("precio_total");
    this.listaCarrito = [];
    this.contenedor_carrito = document.getElementById("contenedor_carrito");
  }

  calcularTotalYMostrarEnDOM() {
    let total = this.listaCarrito.reduce(
      (total, producto) => total + producto.cantidad * producto.precio,
      0
    );
    this.precio_total.innerHTML = `Total a pagar: $${total}`;
  }

  verificarSiExisteElProducto(producto) {
    return this.listaCarrito.find((elproducto) => elproducto.id === producto.id);
  }

  agregar(producto) {
    let objeto = this.verificarSiExisteElProducto(producto);

    if (objeto) {
      objeto.cantidad += 1;
    } else {
      this.listaCarrito.push(producto);
    }
  }

  limpiarCarritoEnStorage() {
    localStorage.removeItem("listaCarrito");
  }

  guardarEnStorage() {
    let listaCarritoJSON = JSON.stringify(this.listaCarrito);
    localStorage.setItem("listaCarrito", listaCarritoJSON);
  }

  verificarExistenciaEnStorage() {
    this.listaCarrito =
      JSON.parse(localStorage.getItem("listaCarrito")) || [];
    if (this.listaCarrito.length > 0) {
      this.mostrarEnDOM();
    }
  }

  limpiarContenedor_Carrito() {
    this.contenedor_carrito.innerHTML = "";
  }

  borrar(producto) {
    let posicion = this.listaCarrito.findIndex(
      (miProducto) => producto.id === miProducto.id
    );

    if (posicion !== -1) {
      this.listaCarrito.splice(posicion, 1);
    }
  }

  mostrarEnDOM() {
    this.limpiarContenedor_Carrito();
    this.listaCarrito.forEach((producto) => {
      this.contenedor_carrito.innerHTML += `
        <div class="card mb-3" style="max-width: 540px;">
            <div class="row g-0">
                <div class="col-md-4">
                <img src="${producto.img}" class="img-fluid rounded-start" alt="${producto.alt}">
                </div>
                <div class="col-md-8">
                    <div class="card-body">
                        <h5 class="card-title">${producto.nombre}</h5>
                        <p class="card-text">Descripcion: ${producto.descripcion}</p>
                        <p class="card-text">Precio: $${producto.precio}</p>
                        <p class="card-text">Cantidad: ${producto.cantidad}</p>
                        <button id="borrar-${producto.id}" class="btn btn-danger">Borrar </button>
                    </div>
                </div>
            </div>
        </div>`;
    });

    this.listaCarrito.forEach((producto) => {
      const btnBorrar = document.getElementById(`borrar-${producto.id}`);

      btnBorrar.addEventListener("click", () => {
        this.borrar(producto);
        this.guardarEnStorage();
        this.mostrarEnDOM();
      });
    });

    this.calcularTotalYMostrarEnDOM();
  }
}

const controladorProductos = new ProductoController();
const controladorCarrito = new CarritoController();

controladorProductos.levantar_y_mostrar(controladorCarrito);

controladorCarrito.verificarExistenciaEnStorage();

const finalizar_compra = document.getElementById("finalizar_compra");

finalizar_compra.addEventListener("click", () => {
  Swal.fire({
    position: "center",
    icon: "success",
    title: "Compra realizada con éxito!",
    showConfirmButton: false,
    timer: 2000,
  });

  controladorCarrito.limpiarContenedor_Carrito();
  controladorCarrito.limpiarCarritoEnStorage();
  controladorCarrito.listaCarrito = [];
  controladorCarrito.calcularTotalYMostrarEnDOM();
});
