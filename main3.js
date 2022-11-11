const main = document.getElementById("main");
const elementosEnCarrito = document.getElementById("element-cart");
const carro = document.querySelector(".cart");
const containerCardGrid = document.createElement("section");
containerCardGrid.className = "conteiner-card";

// let carrito = JSON.parse(localStorage.getItem("carrito")) || [];

/* Variable para manejar el input*/
let inputUsuario = document.createElement("input");
inputUsuario.className = "input-index";
inputUsuario.type = "text";
inputUsuario.name = "name";
inputUsuario.value = "";
inputUsuario.setAttribute("autocomplete", "off");
inputUsuario.setAttribute("pattern", "^[A-Za-z]+$");
inputUsuario.placeholder = "Tu nombre + Enter";
main.insertAdjacentElement("afterbegin", inputUsuario);

/* Variable para manejar el el div de "Su carrito esta vacio"*/
let liVacio = document.createElement("li");
liVacio.innerText = "Su carrito esta vacio";
liVacio.classList = "price-total empty";
carro.insertAdjacentElement("afterend", liVacio);

let carrito = [];
let item = 0;
let total = 0;

const bienvenido = () => {
    let entrada = document.querySelector(".input-index");
    let msjBienvenida = document.createElement("div");
    let tituloCard = document.querySelector(".title-card");
    msjBienvenida.className = "div-msj";
    tituloCard.insertAdjacentElement("beforebegin", msjBienvenida);
    entrada.addEventListener("keyup", function (ev) {
        let valido = ev.target.checkValidity();
        console.log(valido);
        if (ev.keyCode === 13) {
            if (ev.target.value.length > 4 && valido === true) {
                Swal.mixin({
                    toast: true,
                }).bindClickHandler("data-swal-toast-template");
                Swal.fire({
                    title: "Bienvenido",
                    text: `${entrada.value} registrate en nuestra web de productos de Electronica`,
                    showClass: {
                        popup: "animate__animated animate__fadeInDown",
                    },
                    hideClass: {
                        popup: "animate__animated animate__fadeOutUp",
                    },
                    confirmButtonColor: "#d33",
                    confirmButtonText: "Registrate",
                    timer: 3000,
                    timerProgressBar: true,
                }).then((res) => {
                    if (res.isConfirmed) {
                        location.href = "/pages/registrate.html";
                    }
                });
            } else {
                Swal.fire({
                    icon: "error",
                    title: "Oops...",
                    text: "Ingresaste un nombre invalido",
                });
            }
        }
    });
};

// if("carrito" in localStorage){ alert('yes'); } else { alert('no'); }

const leerLocalStorage = () => {
    carrito = JSON.parse(localStorage.getItem("carrito"));
    if (!carrito) carrito = [];
};

main.insertBefore(containerCardGrid, carro);

bienvenido();

for (const producto of productos) {
    let div = document.createElement("div");
    let boton = document.createElement("button");
    div.className = "card-grid";
    div.innerHTML = `
        <img class="img-card" src="${producto.img}" alt="${producto.nombre}" />
        <h3 class="product-card">${producto.nombre}</h3>
        <p class="stock-card">Precio: $ ${producto.precio.toFixed(2)}</p>
        <p class="price-card">Stock: ${producto.stock}</p>
        `;
    boton.className = `button-card button-id-${producto.id}`;
    boton.innerText = "COMPRAR";
    div.append(boton);
    let prodArray = [];
    prodArray.push(producto.id, producto.nombre, producto.precio, producto.img);
    boton.addEventListener("click", (e) => {
        e.preventDefault();
        let prodArray = [];
        prodArray.push(
            producto.id,
            producto.nombre,
            producto.precio,
            producto.img
        );
        if (carrito.some((prod) => prod.id === producto.id)) {
            Swal.fire({
                position: "top-start",
                icon: "warning",
                title: `El producto ya fue agregado al carrito`,
                showConfirmButton: false,
                timer: 1500,
            });
        } else {
            ventanaModal(prodArray);
        }
    });
    containerCardGrid.append(div);
}

const agregarAlCarrito = (itemId, unidades) => {
    liVacio.style.display = "none";
    let itemProd = productos.find((prod) => prod.id === itemId);
    itemProd["cantidad"] = unidades;
    console.log(carrito);
    carrito.push(itemProd);
    Toastify({
        text: `Agregaste al carrito`,
        className: "info",
        duration: 5000,
        gravity: "bottom",
        position: "center",
    }).showToast();

    guardarLocalStorage();
    actualizarCarrito();
};

const actualizarCarrito = () => {
    elementosEnCarrito.innerHTML = "";

    total = carrito.reduce(
        (acc, el) => acc + parseFloat(el.precio) * parseInt(el.cantidad),
        0
    );
    carrito.forEach((items) => {
        const productosEnCarrito = document.createElement("li");
        productosEnCarrito.setAttribute("id", `prod-${items.id}`);
        let botonBorrar = document.createElement("button");
        let subTotal = parseFloat(items.precio) * parseInt(items.cantidad);
        productosEnCarrito.className = "prod-in-cart";
        productosEnCarrito.innerHTML = `
        <p class="name">${items.nombre}</p>
        <p class="price">Precio: $ ${items.precio.toFixed(2)}</p>
        <p class="quanty">Unidades: <i attr="${items.id}">${
            items.cantidad
        }</i></p>
        <span class="subtract">-</span>
        <span class="add">+</span>
        <p class="total">total: $ ${subTotal.toFixed(2)}</p>`;
        botonBorrar.classList.add("erase-product", "btn");
        botonBorrar.setAttribute("id", `${items.id}`);
        botonBorrar.addEventListener("click", eliminarProducto);

        botonBorrar.innerText = "Quitar";
        productosEnCarrito.appendChild(botonBorrar);
        elementosEnCarrito.append(productosEnCarrito);

        productosEnCarrito
            .querySelector(".subtract")
            .addEventListener("click", (e) => {
                e.preventDefault();
                Toastify({
                    text: `Quitaste otro producto "${items.nombre}" :O`,
                    className: "info",
                    duration: 3000,
                    gravity: "bottom",
                    position: "left",
                    style: {
                        background: "linear-gradient(to right, #red, #ffb09b)",
                    },
                }).showToast();
                restar(items.id);
            });
        productosEnCarrito
            .querySelector(".add")
            .addEventListener("click", (e) => {
                e.preventDefault();
                Toastify({
                    text: `Sumaste otro producto "${items.nombre}" xD`,
                    className: "info",
                    duration: 3000,
                    gravity: "bottom",
                    position: "right",
                    style: {
                        background:
                            "linear-gradient(to right, #ffb09b, #96c93d)",
                    },
                }).showToast();
                sumar(items.id);
            });
    });
    guardarLocalStorage();

    const precioFinal = document.createElement("li");
    precioFinal.className = "price-total";
    precioFinal.innerHTML = `
    <p class="total-total">TOTAL:</p>
    <p></p>
    <p></p>
    <p class="total-total">$ ${total.toFixed(2)}</p>
    <button class="button-empty btn" id="button-empty">Vaciar</button>
    <button class="btn btn-pay" id="button-pay">Pagar</button>`;
    elementosEnCarrito.appendChild(precioFinal);

    let botonPagar = elementosEnCarrito.querySelector("#button-pay");
    botonPagar.addEventListener("click", cerrarCompra);

    // console.log(items);
    if (carrito.length === 0) {
        precioFinal.style.display = "none";
        liVacio.style.display = "none";
    }
    vaciarCarrito();
    leerLocalStorage();
};

const cerrarCompra = (ev) => {
    ev.preventDefault();
    let carritoParaPagar = carrito;
    let templateUno = document.getElementById("template-one");
    let templateDos = document.getElementById("template-two");

    templateUno.innerHTML = `
                    <swal-title>
                        Seguro vas a cerrar la compra?
                    </swal-title>
                    <swal-icon type="info" color="red"></swal-icon>
                    
                    <swal-button type="confirm">
                        Resumen
                    </swal-button>
                    <swal-button type="cancel">
                        Cancel
                    </swal-button>
                    <swal-param name="allowEscapeKey" value="false" />
                    <swal-param
                        name="customClass"
                        value='{ "popup": "my-popup" }' />
                    <swal-function-param
                        name="didOpen"
                        value="popup => console.log(popup)" />
                `;
    templateDos.innerHTML = `
                    <swal-title>
                        Tu resumen
                    </swal-title>
                    <swal-icon type="success" color="green"></swal-icon>
                    <swal-button type="confirm">
                        Pagar
                    </swal-button>
                `;

    Swal.fire({
        template: templateUno,
    }).then((res) => {
        // const divPrimero = document.querySelector(".swal2-icon-warning");
        const divPagar = document.getElementById("swal2-html-container");
        if (res.isConfirmed) {
            for (const item of carritoParaPagar) {
                console.log(divPagar.innerHTML);
                Swal.fire({
                    template: templateDos,
                    html: divPagar.innerHTML += 
                                    `<tbody>
                                        <tr>
                                            <td>Componente: ${item.nombre}</td>
                                            <p></p>
                                            <td>Cantidad: ${item.cantidad}</td>
                                            <p></p>
                                            <td>Subtotal: ${(item.precio * item.cantidad).toFixed(2)}</td>
                                        </tr>
                                        </tbody>
                                      <br>
                                      `,
                    footer:` <strong>Total: ${total}</strong>`
                    // alert("pagado");
                    // carrito = [];
                    // actualizarCarrito();
                }).then(res => {
                    
                });

            }
        }
        
    });
};

const vaciarCarrito = () => {
    let botonVaciarCarrito = document.getElementById("button-empty");
    let todos = document.querySelector(".element-cart");
    let liVacio = document.querySelector(".empty");
    botonVaciarCarrito.addEventListener("click", (e) => {
        e.preventDefault();
        carrito.length = 0;
        if (carrito.length === 0) {
            liVacio.style.display = "none";
        }
        todos.innerHTML = "";
        Toastify({
            text: `Su carrito esta vacio`,
            className: "info",
            duration: 3000,
            gravity: "top",
            position: "center",
            style: {
                background: "linear-gradient(to right, #ffb010, #940)",
            },
        }).showToast();
        guardarLocalStorage();
    });
};

const eliminarProducto = (e) => {
    Swal.fire({
        title: "Estás seguro?",
        text: "Su producto será eliminado!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Eliminar",
    }).then((result) => {
        if (result.isConfirmed) {
            Swal.fire(
                "Eliminado!",
                "El producto se eliminó en forma correcta",
                "success"
            );
            let idBorrar = e.target.id;
            carrito = carrito.filter((el) => el.id != idBorrar);
            carrito.length === 0 && vaciarCarrito();
            guardarLocalStorage();
            actualizarCarrito();
        }
    });
};

const guardarLocalStorage = () => {
    localStorage.setItem("carrito", JSON.stringify(carrito));
};

// modal

const ventanaModal = (prodArray) => {
    let modal = document.getElementById("myModal");
    let body = document.getElementById("body");

    body.innerHTML = `
    <div class="content-left">
        <li><img class="modal-img modal-content-left" src="${prodArray[3]}" alt="${prodArray[1]}" /></li>
        <li class="modal-text modal-content-left">${prodArray[1]}</li>
    </div>
    <div class="content-rigth">
        <li class="modal-text modal-content-right">Precio: $ ${prodArray[2]}</li>
        <li class="modal-text modal-content-right">Unidades <input class="input-modal" value=""></li>
    </div>
    <div class="modal-btn">
        <span class="add-cart modal-text modal-content-btn hover">Agregar al Carrito</span>
        <span class="close modal-text modal-content-btn hover">Cerrar</span>
    </div>`;
    modal.classList.add("modal-show");
    body.querySelector(".input-modal").setAttribute("pattern", "^[1-9]d*$");
    body.querySelector(".input-modal").setAttribute("id", "campo-numerico");
    body.querySelector(".input-modal").setAttribute("min", "1");
    body.querySelector(".input-modal").setAttribute("type", "number");

    let spanCerrar = document.querySelector(".close");
    let spanAgregar = document.querySelector(".add-cart");
    const campoNumerico = document.getElementById("campo-numerico");

    let unidades = 0;
    let teclaPresionadaEsUnNumero = true;

    campoNumerico.addEventListener("input", valorNumerico);

    function valorNumerico(e) {
        e.preventDefault();
        let teclaPresionada = e.srcElement.value;
        teclaPresionadaEsUnNumero = Number.isInteger(parseInt(teclaPresionada));
        const sePresionoUnaTeclaNoAdmitida =
            teclaPresionada != "ArrowDown" &&
            teclaPresionada != "ArrowUp" &&
            teclaPresionada != "ArrowLeft" &&
            teclaPresionada != "ArrowRight" &&
            teclaPresionada != "Backspace" &&
            teclaPresionada != "Delete" &&
            teclaPresionada != "Enter" &&
            !teclaPresionadaEsUnNumero;
        let comienzaPorCero = teclaPresionada == 0;
        if (sePresionoUnaTeclaNoAdmitida || comienzaPorCero) {
            e.preventDefault();
            Swal.fire({
                icon: "error",
                title: "Oops...",
                text: "El campo no puede estar vacio y debe ser distinto de 0",
            });
            campoNumerico.value = "";
        }
        unidades = parseInt(teclaPresionada);
    }

    spanCerrar.onclick = (e) => {
        e.preventDefault();
        modal.classList.remove("modal-show");
    };
    spanAgregar.onclick = (e) => {
        e.preventDefault();
        if (!teclaPresionadaEsUnNumero || unidades === 0) {
            Swal.fire({
                icon: "error",
                title: "Oops...",
                text: "Debe agregar una cantidad para continuar",
            });
        } else {
            agregarAlCarrito(prodArray[0], unidades);
            modal.classList.remove("modal-show");
        }
    };
};

function restar(argId) {
    let divPadre = document.getElementById("element-cart");
    let prodId = divPadre.querySelector(`#prod-${argId}`);
    carrito.find((el) => {
        if (el.id === argId) {
            el.cantidad--;
            if (el.cantidad === 0) {
                console.log("entre aca");
                carrito = carrito.filter((prod) => prod.id !== argId);
                divPadre.removeChild(prodId);
            }
        }
    });
    actualizarCarrito();
}

function sumar(argId) {
    carrito.find((el) => {
        if (el.id === argId) {
            el.cantidad++;
        }
    });
    actualizarCarrito();
}

leerLocalStorage();
actualizarCarrito();
