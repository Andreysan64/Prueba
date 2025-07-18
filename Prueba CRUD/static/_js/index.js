let SubMenu = document.getElementById("SubMenu");

function blurMenu() {
    SubMenu.classList.remove("open-menu");
}
function toggleMenu(){
    SubMenu.classList.toggle("open-menu");
}

let modo = 'crear';
let tarjetaEditando = null;
const modal = document.getElementById('modal-formulario');
const formulario = document.getElementById('formularioSolicitud');
const tituloModal = document.getElementById('modal-titulo');

/* CUSTOM SELECT CON OPCIONES OCULTAS DINÁMICAMENTE */
function buildCustomSelect() {
    const selectWrapper = document.querySelector(".solicitudes-estados");
    const select = selectWrapper.querySelector("select");
    let selectedDiv = selectWrapper.querySelector(".select-selected");
    let itemsDiv = selectWrapper.querySelector(".select-items");

    // Eliminar previos si existen
    if (selectedDiv) selectedDiv.remove();
    if (itemsDiv) itemsDiv.remove();

    // Crear el div de la opción seleccionada
    selectedDiv = document.createElement("DIV");
    selectedDiv.setAttribute("class", "select-selected");
    selectedDiv.innerHTML = select.options[select.selectedIndex].innerHTML;
    selectWrapper.appendChild(selectedDiv);

    // Crear las opciones del menú
    itemsDiv = document.createElement("DIV");
    itemsDiv.setAttribute("class", "select-items select-hide");

    for (let j = 0; j < select.options.length; j++) {
        const opcionTexto = select.options[j].innerHTML;

        // Ocultar la opción seleccionada actual del submenú
        if (select.selectedIndex === j) continue;

        const c = document.createElement("DIV");
        c.innerHTML = opcionTexto;

        c.addEventListener("click", function() {
            select.selectedIndex = j;
            selectedDiv.innerHTML = opcionTexto;

            buildCustomSelect();  // Reconstruir menú
            filtrarTarjetas();    // Filtrar tarjetas visibles
        });

        itemsDiv.appendChild(c);
    }

    selectWrapper.appendChild(itemsDiv);

    // Abrir/cerrar menú
    selectedDiv.addEventListener("click", function(e) {
        e.stopPropagation();
        closeAllSelect(this);
        this.nextSibling.classList.toggle("select-hide");
        this.classList.toggle("select-arrow-active");
    });
}

/* CERRAR SELECT PERSONALIZADO */
function closeAllSelect(elmnt) {
    var x, y, i, xl, yl, arrNo = [];
    x = document.getElementsByClassName("select-items");
    y = document.getElementsByClassName("select-selected");
    xl = x.length;
    yl = y.length;
    for (i = 0; i < yl; i++) {
        if (elmnt === y[i]) {
            arrNo.push(i);
        } else {
            y[i].classList.remove("select-arrow-active");
        }
    }
    for (i = 0; i < xl; i++) {
        if (arrNo.indexOf(i) === -1) {
            x[i].classList.add("select-hide");
        }
    }
}

document.addEventListener("click", closeAllSelect);

/* NORMALIZAR TEXTO */
function normalizarTexto(texto) {
    return texto.toLowerCase()
                .normalize("NFD")
                .replace(/[\u0300-\u036f]/g, "");
}

/* FILTRAR TARJETAS EXISTENTES */
function filtrarTarjetas() {
    const select = document.querySelector(".solicitudes-estados select");
    const filtro = normalizarTexto(select.value);
    const contenedor = document.querySelector('.cards-solicitudes');
    const tarjetas = Array.from(document.querySelectorAll('.card-solicitud'));

    let total = 0;

    if (filtro === 'todos') {

        // Orden deseado
        const orden = ["solicitado", "operación", "operacion", "pendiente", "cerrado", "eliminado"];

        tarjetas.sort((a, b) => {
            const estadoA = normalizarTexto(a.querySelector('.estado').innerText);
            const estadoB = normalizarTexto(b.querySelector('.estado').innerText);

            const indexA = orden.indexOf(estadoA);
            const indexB = orden.indexOf(estadoB);

            return indexA - indexB;
        });

        // Vaciar y volver a agregar las tarjetas ordenadas
        contenedor.innerHTML = '';
        tarjetas.forEach(tarjeta => {
            tarjeta.style.display = 'block';
            contenedor.appendChild(tarjeta);
            total++;
        });

    } else {
        tarjetas.forEach(tarjeta => {
            const estado = tarjeta.querySelector('.estado').innerText;
            if (normalizarTexto(estado) === filtro) {
                tarjeta.style.display = 'block';
                total++;
            } else {
                tarjeta.style.display = 'none';
            }
        });
    }

    document.querySelector('.solicitudes-footer strong').innerText = total;
}

/* OPCIONAL: por si el select nativo cambia por teclado */
document.querySelector(".solicitudes-estados select").addEventListener("change", function(){
    buildCustomSelect();
    filtrarTarjetas();
});

document.querySelector('.input-busqueda').addEventListener('input', function() {
    const termino = normalizarTexto(this.value);
    const tarjetas = document.querySelectorAll('.card-solicitud');

    let totalVisible = 0;

    tarjetas.forEach(tarjeta => {
        const titulo = tarjeta.querySelector('h4').innerText;
        const estado = tarjeta.querySelector('.estado').innerText;
        const datos = Array.from(tarjeta.querySelectorAll('.soli-dato p')).map(p => p.innerText).join(' ');

        const textoCompleto = `${titulo} ${estado} ${datos}`;
        const textoNormalizado = normalizarTexto(textoCompleto);

        if (textoNormalizado.includes(termino)) {
            tarjeta.style.display = 'block';
            totalVisible++;
        } else {
            tarjeta.style.display = 'none';
        }
    });

    document.querySelector('.solicitudes-footer strong').innerText = totalVisible;
});

/* CREAR TARJETA */
function crearTarjeta(solicitud) {
    const tarjeta = document.createElement('div');
    tarjeta.classList.add('card-solicitud', `estado-${normalizarTexto(solicitud.estado)}`);

    tarjeta.innerHTML = `
        <h4>${solicitud.titulo}</h4>
        <div class="solicitud-info">
            <span class="estado">${solicitud.estado}</span>
            <div class="soli-dato">
                <p><strong>Asignada a:</strong></p>
                <p class="asignado">${solicitud.asignado}</p>
            </div>
            <div class="soli-dato">
                <p><strong>Descripción:</strong></p>
                <p class="descripcion">${solicitud.descripcion}</p>
            </div>
            <div class="acciones">
                <button class="btn-editar">Editar</button>
                <button class="btn-eliminar">Eliminar</button>
            </div>
        </div>
    `;

    // Acción Editar
    tarjeta.querySelector('.btn-editar').addEventListener('click', () => {
        modo = 'editar';
        tarjetaEditando = tarjeta;

        // Llenar formulario con datos actuales
        formulario.titulo.value = tarjeta.querySelector('h4').innerText;
        formulario.asignado.value = tarjeta.querySelector('.asignado').innerText;
        formulario.descripcion.value = tarjeta.querySelector('.descripcion').innerText;
        formulario.estado.value = tarjeta.querySelector('.estado').innerText;

        tituloModal.innerText = 'Editar Solicitud';
        modal.classList.remove('hidden');
        document.querySelector('.opcion-cerrado').style.display = 'block';
    });

    // Acción Eliminar (solo cambia el estado visualmente)
    tarjeta.querySelector('.btn-eliminar').addEventListener('click', () => {
        tarjeta.querySelector('.estado').innerText = 'Eliminado';

        // Cambiar clase de estado eliminando las anteriores
        tarjeta.classList.remove('estado-solicitado', 'estado-operacion', 'estado-pendiente', 'estado-cerrado');
        tarjeta.classList.add('estado-eliminado');

        actualizarContador();
        filtrarTarjetas();
    });

    document.querySelector('.cards-solicitudes').appendChild(tarjeta);
    actualizarContador();
}

/* ACTUALIZAR CONTADOR */
function actualizarContador() {
    const total = document.querySelectorAll('.card-solicitud').length;
    document.querySelector('.solicitudes-footer strong').innerText = total;
}

/* CREAR SOLICITUD (ABRIR MODAL) */
document.querySelector('.btn-crear').addEventListener('click', () => {
    console.log("Click detectado: creando solicitud");

    modo = 'crear';
    tarjetaEditando = null;

    formulario.reset();
    tituloModal.innerText = 'Nueva Solicitud';
    modal.classList.remove('hidden');

    document.querySelector('.opcion-cerrado').style.display = 'none';
});

/* GUARDAR FORMULARIO */
formulario.addEventListener('submit', (e) => {
    e.preventDefault();

    const nuevaSolicitud = {
        titulo: formulario.titulo.value,
        asignado: formulario.asignado.value,
        descripcion: formulario.descripcion.value,
        estado: formulario.estado.value
    };

    if (modo === 'crear') {
        crearTarjeta(nuevaSolicitud);
        filtrarTarjetas();
    } else if (modo === 'editar' && tarjetaEditando) {
        tarjetaEditando.querySelector('h4').innerText = nuevaSolicitud.titulo;
        tarjetaEditando.querySelector('.asignado').innerText = nuevaSolicitud.asignado;
        tarjetaEditando.querySelector('.descripcion').innerText = nuevaSolicitud.descripcion;
        tarjetaEditando.querySelector('.estado').innerText = nuevaSolicitud.estado;
        tarjetaEditando.className = `card-solicitud estado-${normalizarTexto(nuevaSolicitud.estado)}`;
        filtrarTarjetas();
    }

    modal.classList.add('hidden');
});

/* CANCELAR MODAL */
document.getElementById('cancelarModal').addEventListener('click', () => {
    modal.classList.add('hidden');
});

/* -------------------------------------------- CAMBIAR POR BASE DE DATOS ---------------------------------------------- */

const personas = [
    "Carlos Pérez",
    "Ana Gómez",
    "Andrey Castro",
    "Valentina Ruiz",
    "Julián Martínez",
    "Camila Torres"
];

/* -------------------------------------------- CAMBIAR POR BASE DE DATOS ---------------------------------------------- */

/* FUNCIONALIDAD DEL MODAL */

const inputAsignado = document.getElementById('inputAsignado');
const sugerenciasDiv = document.getElementById('sugerenciasAsignado');
const nombresDisponibles = personas;

function mostrarSugerencias(filtro = "") {
    const coincidencias = nombresDisponibles.filter(nombre =>
        nombre.toLowerCase().includes(filtro.toLowerCase())
    );

    sugerenciasDiv.innerHTML = "";
    coincidencias.forEach(nombre => {
        const opcion = document.createElement('div');
        opcion.classList.add('opcion-sugerida');
        opcion.innerText = nombre;

        opcion.addEventListener('click', (e) => {
            e.stopPropagation(); // Prevenir que el click cierre el menú antes de seleccionar
            inputAsignado.value = nombre;
            sugerenciasDiv.style.display = "none";
        });

        sugerenciasDiv.appendChild(opcion);
    });

    sugerenciasDiv.style.display = coincidencias.length > 0 ? 'block' : 'none';
}

// Mostrar todas las opciones al enfocar el input
inputAsignado.addEventListener('focus', () => {
    mostrarSugerencias("");
});

// Filtrar mientras escribe
inputAsignado.addEventListener('input', (e) => {
    mostrarSugerencias(e.target.value);
});

// Cerrar las sugerencias al hacer click fuera
document.addEventListener('click', (e) => {
    if (e.target !== inputAsignado && !sugerenciasDiv.contains(e.target)) {
        sugerenciasDiv.style.display = "none";
    }
});

/* INICIALIZACIÓN */
buildCustomSelect();
filtrarTarjetas();