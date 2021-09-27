if (!localStorage.getItem("contactos")) {
  const arr = [];
  localStorage.setItem("contactos", JSON.stringify(arr));
}

const contactos = JSON.parse(localStorage.getItem("contactos"));
const formulario = document.getElementById("crear");

function init() {
  formulario.addEventListener("submit", crearUsuario);
  cargarDatos();
}

function crearUsuario(event) {
  event.preventDefault();
  let id = Number(document.getElementById("id").value);
  let nombre = document.getElementById("nombre").value;
  let apellidos = document.getElementById("apellidos").value;
  let edad = document.getElementById("edad").value;
  let telefono = document.getElementById("telefono").value;
  let ciudad = document.getElementById("ciudad").value;
  let direccion = document.getElementById("direccion").value;

  let contactoTmp = {
    id,
    nombre,
    apellidos,
    edad,
    telefono,
    ciudad,
    direccion,
  };

  if (contactos.findIndex((contacto) => contacto.id === id) === -1) {
    contactos.push(contactoTmp);
    formulario.reset();
    localStorage.setItem("contactos", JSON.stringify(contactos));
    swal("Contacto Creado!", "", "success");
    borrarTabla();
    cargarDatos();

    return;
  }

  swal("El id ya existe", "", "error");
}

function cargarDatos() {
  const cuerpoTabla = document.getElementById("cuerpo-tabla");

  contactos.forEach((contacto) => {
    const tr = document.createElement("tr");
    tr.className = "elemento";

    const tdId = document.createElement("td");
    const tdNombre = document.createElement("td");
    const tdApellidos = document.createElement("td");
    const tdEdad = document.createElement("td");
    const tdTelefono = document.createElement("td");
    const tdCiudad = document.createElement("td");
    const tdDireccion = document.createElement("td");
    const tdIconos = document.createElement("td");

    tdId.innerText = contacto.id;

    tdNombre.innerText = contacto.nombre;
    tdApellidos.innerText = contacto.apellidos;
    tdEdad.innerText = contacto.edad;
    tdTelefono.innerText = contacto.telefono;
    tdCiudad.innerText = contacto.ciudad;
    tdDireccion.innerText = contacto.direccion;
    tdIconos.innerHTML = `<a href="" onClick="topContacto(event, ${contacto.id})">
    <svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-arrow-up-circle" width="24" height="24" viewBox="0 0 24 24" stroke-width="1.5" stroke="#00abfb" fill="none" stroke-linecap="round" stroke-linejoin="round">
        <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
        <circle cx="12" cy="12" r="9" />
        <line x1="12" y1="8" x2="8" y2="12" />
        <line x1="12" y1="8" x2="12" y2="16" />
        <line x1="16" y1="12" x2="12" y2="8" />
      </svg>
    </a>
    <a href="" onClick="eliminarContactoClick(event, ${contacto.id})">
        <svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-circle-x" width="24" height="24" viewBox="0 0 24 24" stroke-width="1.5" stroke="#ff2825" fill="none" stroke-linecap="round" stroke-linejoin="round">
            <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
            <circle cx="12" cy="12" r="9" />
            <path d="M10 10l4 4m0 -4l-4 4" />
          </svg>
    </a>`;

    tr.appendChild(tdId);
    tr.appendChild(tdNombre);
    tr.appendChild(tdApellidos);
    tr.appendChild(tdEdad);
    tr.appendChild(tdTelefono);
    tr.appendChild(tdCiudad);
    tr.appendChild(tdDireccion);
    tr.appendChild(tdIconos);

    cuerpoTabla.appendChild(tr);
  });
}

function borrarTabla() {
  const cuerpoTabla = (document.getElementById("cuerpo-tabla").innerHTML = "");
}

function eliminarContactoClick(event, dni) {
  event.preventDefault();

  const id = contactos.findIndex((contacto) => contacto.id === dni);
  contactos.splice(id, 1);
  localStorage.setItem("contactos", JSON.stringify(contactos));
  swal("Contacto Eliminado!", "", "success");
  borrarTabla();
  cargarDatos();
  return;
}

function topContacto(event, dni) {
  event.preventDefault();

  const id = contactos.findIndex((contacto) => contacto.id === dni);
  let aux = contactos[id];
  contactos.splice(id, 1);
  contactos.unshift(aux);
  localStorage.setItem("contactos", JSON.stringify(contactos));
  swal("Contacto agregado al top!", "", "success");
  borrarTabla();
  cargarDatos();
}

init();
