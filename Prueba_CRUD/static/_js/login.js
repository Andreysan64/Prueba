const form = document.getElementById('formulario');
const inputs = document.querySelectorAll('#formulario input');

const validator = /^[a-zA-Z0-9_]+([.][a-zA-Z0-9_]+)*@[a-zA-Z0-9_]+([.][a-zA-Z0-9_]+)*\.[a-zA-Z]{1,5}$/;

const validarForm = (e) => {
    const campo = e.target;
    const campoContenedor = document.getElementById(`txt${campo.name}`);
    const label = document.getElementById(`lbl${campo.name}`);

    if (campo.name === "correo") {
        if (validator.test(campo.value)) {
            label.classList.add('txt_field-up');
        } else if (campo.value === "") {
            label.classList.remove('txt_field-up');
        } else {
            label.classList.add('txt_field-up');
        }
    }

    if (campo.name === "password") {
        if (campo.value !== "") {
            label.classList.add('txt_field-up');
        } else {
            label.classList.remove('txt_field-up');
        }
    }
};

inputs.forEach((input) => {
    input.addEventListener('keyup', validarForm);
    input.addEventListener('blur', validarForm);
});

form.addEventListener('submit', (e) => {
    e.preventDefault();

    const correo = form.correo.value.trim();
    const password = form.password.value.trim();

    if (!validator.test(correo)) {
        alert('Correo inválido');
        return;
    }

    if (password === '') {
        alert('Contraseña requerida');
        return;
    }

    console.log('Formulario válido. Datos enviados:');
    console.log({
        correo: correo,
        password: password
    });

    // Aquí iría tu fetch al backend si lo deseas.
});