const formulario = document.getElementById("form");
const groups = document.querySelectorAll(".group");

let j = 0;
let validoNombre = false;
let validoMail = false;
let validoPass = false;

for (let z = 0; z < groups.length; z++) {
    let textAtrr = [
        { id: "name", type: "text", name: "Nombre" },
        { id: "email", type: "email", name: "Email" },
        { id: "password", type: "password", name: "Password" },
    ];

    let i = 0;

    while (i === 0) {
        let input = document.createElement("input");
        let label = document.createElement("label");
        let spanBar = document.createElement("span");

        groups[z].appendChild(input);
        input.className = "input-register";
        input.id = `${textAtrr[j].id}`;
        input.type = `${textAtrr[j].type}`;
        input.insertAdjacentElement("afterend", spanBar);
        input.setAttribute("required", true);
        input.setAttribute("autocomplete", "off");
        spanBar.className = "bar";
        spanBar.insertAdjacentElement("afterend", label);
        label.className = "label-register";
        label.innerText = `${textAtrr[j].name}`;
        i++;
        // console.log("i:" + i);
    }
    j++;
    // console.log("j:" + j);
}

const nombre = document.getElementById("name");
const mail = document.getElementById("email");
const pass = document.getElementById("password");

formulario.addEventListener("submit", (e) => {
    let regExpMail = new RegExp(/(\w+\.?|-?\w+?)+@\w+\.?-?\w+?(\.\w{2,3})+$/);
    e.preventDefault();

    nombre.value.length < 6 ? nombreError() : (validoNombre = true);

    !regExpMail.test(mail.value) ? mailError() : (validoMail = true);

    pass.value.length < 8 ? passError() : (validoPass = true);

    validoNombre === true && validoMail === true && validoPass === true
        ? suscriptoValido()
        : campoNoValido();
});

function nombreError() {
    Toastify({
        text: "El nombre debe tener mas de 8 caracteres.",
        className: "info",
        gravity: "button",
        position: "left",
        stopOnFocus: true,
        style: {
            background: "linear-gradient(to right, #dd2424, #a11111)",
        },
        close: true,
    }).showToast();
}

function mailError() {
    Toastify({
        text: "El correo ingresado no es válido.",
        className: "info",
        gravity: "button",
        position: "center",
        stopOnFocus: true,
        style: {
            background: "linear-gradient(to right, #dd2424, #a11111)",
        },
        close: true,
    }).showToast();
}

function passError() {
    Toastify({
        text: "La contraseña debe tener 8 caracteres minimo.",
        className: "info",
        gravity: "button",
        position: "right",
        stopOnFocus: true,
        style: {
            background: "linear-gradient(to right, #dd2424, #a11111)",
        },
        close: true,
    }).showToast();
}

function suscriptoValido() {
    Swal.fire({
        position: "button-start",
        icon: "success",
        title: "Te suscribiste...!!!",
        showConfirmButton: false,
        timer: 1500,
    });
}

function campoNoValido() {
    Swal.fire({
        position: "button-end",
        icon: "warning",
        title: "Uno de los campos posee un error",
        showConfirmButton: false,
        timer: 1500,
    });
}
