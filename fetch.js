const list = document.querySelector("#list");
const titleNews = document.querySelector(".title-news");
const navbarCommingSoon = document.querySelector(".navbar-comming-soon");
const cardsTitleNews= document.querySelector(".cards-title-news");
const cards = document.querySelector(".cards");
const commingSoonBefore = document.querySelector(".comming-soon-before");
// const mainCommingSoon = document.querySelector(".main-cooming-soon");

fetch("https://fakestoreapi.com/products/category/electronics")
    .then((res) => res.json())
    .then((json) => localStorage.setItem("productos", JSON.stringify(json)))
    .catch((e) => console.log(e.message));

// Llamo a Object para mapear lo que tengo en el local storage
function getProductos() {
    return Object.keys(localStorage).map((key) =>
        JSON.parse(localStorage.getItem('productos'))
    );
}

// Creo Elementos HTML
const creoElemento = (link) => {
    let html = "";
    for (let i = 0; i < link.length; i++) {
        html += `
            <div class="row g-0 card-content">
                <div class="col-md-4 card-content-img">
                    <img src="${link[i].image}" class="card-img-top img-fluid card-img-bg alt="${link[i].title}">
                </div>
                <div class="col-md-8 mt-3">
                    <div class="card-body description">
                        <h5 class="card-title">${link[i].title}</h5>
                        <p class="card-text">Descripcion: ${link[i].description}</p>
                        <p class="card-text">Precio: u$s ${link[i].price}</p>
                        <p class="card-text footer"><small class="text-muted">rating: ${link[i].rating.rate}</small><span class="btn btn-danger reserve">Reservar</span></p>
                    </div>
                </div>
            </div>
        `;
    }
    return html;
};

const renderLinksElementos = () => {
    const linkElementos = getProductos().map(creoElemento).join("");
    list.innerHTML = linkElementos;
};
renderLinksElementos();

const reserve = document.querySelectorAll(".reserve");

// reserve es un arreglo no olvidar
reserve.forEach((btn) => {
    btn.onclick = (e) => {
        e.preventDefault();
        alertify.alert('Confirmando...', "Te notificaremos cuando llegue.", function () {
            alertify.success("Reservado.....!!!!");
        });
    };
});

(function entrada() {
    setTimeout(() => {
        titleNews.style.display = "none";
        commingSoonBefore.classList.add("comming-soon-after");
        commingSoonBefore.classList.remove("comming-soon-before");
        navbarCommingSoon.classList.remove("navbar-comming-soon-hide");
        cardsTitleNews.classList.remove("cards-title-news-hide");
        cards.classList.remove("cards-hide");
    },2000)
})()

