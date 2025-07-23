const form = document.getElementById('formRegistro');
const validator = /^[a-zA-Z0-9_]+([.][a-zA-Z0-9_]+)*@[a-zA-Z0-9_]+([.][a-zA-Z0-9_]+)*\.[a-zA-Z]{1,5}$/;

form.addEventListener('submit', function(e) {
    e.preventDefault();

    const nombre = form.nombre.value.trim();
    const apellidos = form.apellidos.value.trim();
    const correo = form.correo.value.trim();
    const confirmarCorreo = form.confirmarCorreo.value.trim();
    const password = form.password.value.trim();
    const confirmarPassword = form.confirmarPassword.value.trim();
    const acepto = document.getElementById('checkbox1').checked;

    if (!validator.test(correo)) {
        alert('Correo inválido');
        return;
    }

    if (correo !== confirmarCorreo) {
        alert('Los correos no coinciden');
        return;
    }

    if (password.length < 6) {
        alert('La contraseña debe tener mínimo 6 caracteres');
        return;
    }

    if (password !== confirmarPassword) {
        alert('Las contraseñas no coinciden');
        return;
    }

    if (!acepto) {
        alert('Debes aceptar las condiciones de uso');
        return;
    }

    console.log('Registro válido. Datos enviados:');
    console.log({
        nombre,
        apellidos,
        correo,
        password
    });

    // Aquí pondrías tu fetch al backend
});