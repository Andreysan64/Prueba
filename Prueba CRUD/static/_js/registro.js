const form = document.querySelector('form');
const inputs = form.querySelectorAll('input[type="text"], input[type="email"], input[type="password"], input[type="date"]');
const selects = form.querySelectorAll('select');
const checkbox = document.getElementById('checkbox1');

const validatorCorreo = /^[a-zA-Z0-9_.]+@[a-zA-Z0-9_]+\.[a-zA-Z]{2,5}$/;

// Función para las etiquetas flotantes (ya tienes el CSS funcionando)
const actualizarFlotante = (input) => {
    const label = input.parentElement.querySelector('label');
    if (input.value.trim() !== "") {
        label.classList.add('active'); // Opcional si quieres agregar clase, pero ya lo manejas con :focus y :valid
    } else {
        label.classList.remove('active');
    }
};

// Eventos flotantes (aunque tu CSS ya lo hace)
inputs.forEach(input => {
    input.addEventListener('keyup', () => actualizarFlotante(input));
    input.addEventListener('blur', () => actualizarFlotante(input));
});

form.addEventListener('submit', (e) => {
    e.preventDefault();

    // Captura de datos
    const data = {
        nombre: inputs[0].value,
        apellidos: inputs[1].value,
        tipoDocumento: selects[0].value,
        numeroDocumento: inputs[2].value,
        celular: inputs[3].value,
        genero: selects[1].value,
        fechaNacimiento: inputs[4].value,
        ciudad: inputs[5].value,
        correo: inputs[6].value,
        confirmarCorreo: inputs[7].value,
        contraseña: inputs[8].value,
        confirmarContraseña: inputs[9].value,
        aceptoTerminos: checkbox.checked
    };

    // Validaciones básicas
    if (!validatorCorreo.test(data.correo)) {
        alert("El correo no es válido.");
        return;
    }

    if (data.correo !== data.confirmarCorreo) {
        alert("Los correos no coinciden.");
        return;
    }

    if (data.contraseña !== data.confirmarContraseña) {
        alert("Las contraseñas no coinciden.");
        return;
    }

    if (!data.aceptoTerminos) {
        alert("Debes aceptar los términos y condiciones.");
        return;
    }

    // Simulamos envío
    console.log("Datos enviados:", data);
});
