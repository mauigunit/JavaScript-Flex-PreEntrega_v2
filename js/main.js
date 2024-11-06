const todosMisProductos = [
    {
        "id": 1,
        "categoria": "Lacteos",
        "producto": "Yogurt",
        "Precio": 540,
        "stock": 100
    },
    {
        "id": 2,
        "categoria": "Lacteos",
        "producto": "Leche",
        "Precio": 700,
        "stock": 150
    },
    {
        "id": 3,
        "categoria": "Lacteos",
        "producto": "Queso Fresco",
        "Precio": 900,
        "stock": 50
    },
    {
        "id": 4,
        "categoria": "Lacteos",
        "producto": "Mantequilla",
        "Precio": 350,
        "stock": 80
    },
    {
        "id": 5,
        "categoria": "Lacteos",
        "producto": "Crema de Leche",
        "Precio": 600,
        "stock": 120
    },
    {
        "id": 6,
        "categoria": "Frutas",
        "producto": "Manzana",
        "Precio": 300,
        "stock": 150
    },
    {
        "id": 7,
        "categoria": "Frutas",
        "producto": "Platano",
        "Precio": 200,
        "stock": 200
    },
    {
        "id": 8,
        "categoria": "Frutas",
        "producto": "Pera",
        "Precio": 350,
        "stock": 120
    },
    {
        "id": 9,
        "categoria": "Frutas",
        "producto": "Naranja",
        "Precio": 250,
        "stock": 180
    },
    {
        "id": 10,
        "categoria": "Frutas",
        "producto": "Uvas",
        "Precio": 400,
        "stock": 80
    },
    {
        "id": 11,
        "categoria": "Licores",
        "producto": "Whisky",
        "Precio": 1500,
        "stock": 50
    },
    {
        "id": 12,
        "categoria": "Licores",
        "producto": "Tequila",
        "Precio": 1200,
        "stock": 80
    },
    {
        "id": 13,
        "categoria": "Licores",
        "producto": "Ron",
        "Precio": 950,
        "stock": 100
    },
    {
        "id": 14,
        "categoria": "Licores",
        "producto": "Vodka",
        "Precio": 1100,
        "stock": 60
    },
    {
        "id": 15,
        "categoria": "Licores",
        "producto": "Gin",
        "Precio": 1300,
        "stock": 40
    }
]

let listaProductosCarrito = [];

const tituloAPP = "Supermercado";
const lacteosAPP = "Lacteos";
const frutasAPP = "Frutas";
const licoresAPP = "Licores";

/* RESCATO IDS */
const elementTitulo = document.getElementById("tituloAPP");
const elementCarrito = document.getElementById("totalCarrito");
const totalProdCarrito = document.getElementById("totalProdCarrito");
const cardTituloLacteos = document.getElementById("card-title-lacteos");
const cardTituloFrutas = document.getElementById("card-title-frutas");
const cardTituloLicores = document.getElementById("card-title-licores");

/* ASIGNO TITULOS */
elementTitulo.innerText = tituloAPP;
elementCarrito.innerText = "0";
cardTituloLacteos.innerText = lacteosAPP;
cardTituloFrutas.innerText = frutasAPP;
cardTituloLicores.innerText = licoresAPP;

/* MODAL CARRITO */
const tituloVerCarrito = document.getElementById("tituloModalCarrito");
tituloVerCarrito.innerText = "Ver Carrito";

const btnVerCarrito = document.getElementById('btnProductosDelCarrito');
btnVerCarrito.onclick = function () {
    fnVerProductosCarrito();
};

/* FUNCIONES */
const addStorage = (key) => {
    localStorage.setItem(key, JSON.stringify(todosMisProductos));
}

const addStorageCarrito = (key) => {
    localStorage.setItem(key, JSON.stringify(listaProductosCarrito));
}

const getStorage = (key) => {
    let dataStorage = localStorage.getItem(key);
    return JSON.parse(dataStorage);
}

const addStorageTotal = (key, valor) => {
    localStorage.setItem(key, valor);
}

const obtenerProductos = (categoria) => {
    const arrProductos = getStorage("MisProductos");
    return arrProductos.filter(producto => producto.categoria == categoria);
}

const actualizarCarrito = () => {
    addStorageCarrito("MisProductosCarrito");
    const productosCarrito = getStorage("MisProductosCarrito");
    totalProdCarrito.innerText = "total Carrito (" + productosCarrito.length + ")";
    let totalAPagar = productosCarrito.reduce((acumulado, producto) => acumulado + producto.Precio, 0);
    elementCarrito.innerText = "$ " + totalAPagar;
}

const getCarritoStorage = (key) => {
    let dataStorage = getStorage(key);
    if(dataStorage != null) {
        listaProductosCarrito = dataStorage;
        actualizarCarrito();
    } else {
        addStorageCarrito("MisProductosCarrito");
    }
}

const agregarProducto = (id) => {
    listaProductos = getStorage("MisProductos");
    let buscarProducto = listaProductos.find(producto => producto.id == id);
    if (buscarProducto) {
        if (buscarProducto.stock > 0) {
            listaProductosCarrito.push(buscarProducto);
            actualizarCarrito();
        }
        else {
            let msg = document.getElementById('mensaje');
            msg.className = "alert alert-danger text-center";
            msg.innerText = "Producto sin stock";
        }
    }
    else {
        let msg = document.getElementById('mensaje');
        msg.className = "alert alert-danger text-center";
        msg.innerText = "El producto no se encuentra en sistema";
    }
}

const cargarProductos = (nombreLista, categoria) => {
    const arrayFiltro = obtenerProductos(categoria);
    const lista = document.getElementById(nombreLista);
    arrayFiltro.forEach(element => {

        let item = document.createElement("li");
        item.className = "list-group-item";

        let itemDiv = document.createElement("div");
        itemDiv.className = "row";

        let itemDivProd = document.createElement("div");
        itemDivProd.className = "col-6";
        itemDivProd.innerHTML = element.producto;
        let itemDivPrecio = document.createElement("div");
        itemDivPrecio.className = "col-4 colorPrecioNormal";
        itemDivPrecio.innerHTML = "$" + element.Precio;

        let itemButtonAdd = document.createElement("button");
        itemButtonAdd.className = "btn btn-sm btn-primary";
        itemButtonAdd.innerText = "+";
        itemButtonAdd.addEventListener('click', function () {
            agregarProducto(element.id);
        });

        let itemDivAdd = document.createElement("div");
        itemDivAdd.className = "col-2";
        itemDivAdd.append(itemButtonAdd);
        itemDiv.appendChild(itemDivProd);
        itemDiv.appendChild(itemDivPrecio);
        itemDiv.appendChild(itemDivAdd);
        item.append(itemDiv);
        lista.append(item);
    });
}

const eliminarProducto = (id) => {
    const productosCarrito = getStorage("MisProductosCarrito");
    let indice = productosCarrito.findIndex(producto => producto.id == id);
    if (indice != -1) {
        productosCarrito.splice(indice, 1);
        listaProductosCarrito = productosCarrito;
        addStorageCarrito("MisProductosCarrito");
    }
    actualizarCarrito();
    fnVerProductosCarrito();
}

const fnVerProductosCarrito = () => {
    const productosCarrito = getStorage("MisProductosCarrito");
    const lista = document.getElementById('productosDelCarrito');
    lista.innerHTML = "";

    if (productosCarrito.length > 0) {
        productosCarrito.forEach(element => {
            let item = document.createElement("li");
            item.className = "list-group-item";

            let itemDiv = document.createElement("div");
            itemDiv.className = "row";

            let itemDivProd = document.createElement("div");
            itemDivProd.className = "col-9";
            itemDivProd.innerHTML = element.producto;

            let itemButtonRemove = document.createElement("button");
            itemButtonRemove.className = "btn btn-sm btn-danger";
            itemButtonRemove.innerText = "-";
            itemButtonRemove.addEventListener('click', function () {
                eliminarProducto(element.id);
            });

            let itemDivRemove = document.createElement("div");
            itemDivRemove.className = "col-3";
            itemDivRemove.append(itemButtonRemove);

            itemDiv.appendChild(itemDivProd);
            itemDiv.appendChild(itemDivRemove);
            item.append(itemDiv);
            lista.append(item);
        });
    }
    else {
        let item = document.createElement("li");
        item.className = "list-group-item";
        item.innerText = "Carrito Vacio";
        lista.append(item);
    }
}

addStorage("MisProductos");
getCarritoStorage("MisProductosCarrito");
cargarProductos("listLacteos", lacteosAPP);
cargarProductos("listFrutas", frutasAPP);
cargarProductos("listLicores", licoresAPP);
