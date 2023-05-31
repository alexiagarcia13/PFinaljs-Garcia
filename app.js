class Producto {
    constructor(id, nombre, precio, stock, img, alt) {
        this.id = id
        this.nombre = nombre
        this.cantidad = 1
        this.precio = precio
        this.stock = stock
        this.img = img
        this.descripcion = this.descripcion
        this.alt = alt
    }
}
class ProductoController {
    constructor() {
        this.listaProductos = []
    }

    levantarProductos() {
        this.listaProductos[
            
            new Producto(1, "Feyre", 6950, 6, "img/venta/texanas/feyre_choco.jpeg", "Color chocolate", "Texana caña media"),
            new Producto(2, "Feyre", 6950, 8, "img/venta/texanas/feyre_cognac.jpeg", "Color Cognac", "Texana caña media"),
            new Producto(3, "Texas", 6950, 2, "img/venta/texanas/texasbyn.jpeg", "Color Blanco", "Texana caña media"),
            new Producto(4, "Serena", 6950, 4, "img/venta/texanas/tex_serena_camel.jpeg", "Color Camel", "Texana caña media"),
            new Producto(5, "Texas", 6950, 6, "img/venta/texanas/texas_hielo.jpeg", "Color Hielo", "Texana caña media"),
            new Producto(6, "Texas", 5500, 5, "img/venta/texanas/texascortas_black.jpeg", "Color Negro", "Texana caña corta "),
            new Producto(7, "Ela", 5500, 1, "img/venta/texanas/tex_ela_blanca.jpeg", "Color Blanco", "Texana caña corta"),
            new Producto(8, "Ela", 5500, 6, "img/venta/texanas/tex_sophia.jpeg", "Color Nutria", "Texana caña corta")
        ]
    }

    mostrarEnDOM(contenedor_productos) {
        //Monstramos los prodcutos en el DOM de manera dinamica
        this.listaProductos.forEach(producto => {
            contenedor_productos.innerHTML += `
            <div class="card" style="width: 18rem;">
                <img src="${producto.img}" class="card-img-top" alt="${producto.alt}">
                <div class="card-body">
                    <h5 class="card-title">${producto.nombre}</h5>
                    <p class="card-text">${producto.descripcion}</p>
                    <p class="card-text">Precio: $${producto.precio}</p>
                    <a href="#" id="cpu-${producto.id}" class="btn btn-primary">Agregar al carrito</a>
                </div>
            </div>`
        })
    }
}
const controladorProductos = new ProductoController()
controladorProductos.levantarProductos()


let listaCarrito;

//DOM
const contenedor_productos = document.getElementById("contenedor_productos")
const contenedor_carrito = document.getElementById("contenedor_carrito")

//verifico si existe listaCarrito en DOM
if (localStorage.getItem("listaCarrito")) {
    let listaCarritoJSON = listaCarrito.localStorage("listaCarrito")
    listaCarrito = JSON.parse(listaCarritoJSON)
    //Mostrar en DOM
} else {
    listaCarrito = []
}
controladorProductos.mostrarEnDOM(contenedor_productos)

//Dar eventos
controladorProductos.listaProductos.forEach(producto => {
    document.getElementById(`cpu-${producto.id}`)
    btnAP.addEventListener("click", () => {

        listaCarrito.push(producto)

        //convertir objeto a JSON
        let listaCarritoJSON = JSON.stringify(listaCarrito)
        localStorage.setItem("listaCarrito", listaCarritoJSON)

        //limpio el contenedor para recorrer todo el arreglo y que no se repita sin querer los productos.
        contenedor_carrito.innerHTML = ""
        listaCarrito.forEach(producto => {
            contenedor_carrito.innerHTML +=
                ` <div class="card mb-3" style="max-width: 540px;">
         <div class="row g-0">
           <div class="col-md-4">
           <img src="${producto.img}" class="img-fluid rounded-start" alt="${producto.alt}">
           </div>
           <div class="col-md-8">
            <div class="card-body">
             <h5 class="card-title">${producto.nombre}</h5>
             <p class="card-text">Precio: $${producto.precio}</p>
             <p class="card-text">Cantidad: ${producto.cantidad}</p>
             <p class="card-text"><small class="text-body-secondary">Last updated 3 mins ago</small></p>
            </div>
           </div>
         </div>
        </div>`
        })
    })
})

const btn = document.getElementById("btn")

const finalizar_compra = document.getElementById("finalizar_compra")
finalizar_compra.addEventListener("click",()=>{
    Swal.fire(
    'Compra realizada con exito',
  )
})