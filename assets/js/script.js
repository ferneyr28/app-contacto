if(localStorage.getItem("contactos") === null) {
    const arr = []
    localStorage.setItem('contactos', JSON.stringify(arr))
}

const contactos = JSON.parse(localStorage.getItem("contactos"));
console.log(contactos);

function init() {
  const formulario = document.getElementById("crear");
  console.log(formulario);

  formulario.addEventListener("submit", crearUsuario);

  const eliminar = document.getElementById("eliminar");
  eliminar.addEventListener("submit", eliminarContacto);

  const top = document.getElementById("top");
  top.addEventListener("submit", topContacto);


  cargarDatos();



  
  
}

function crearUsuario(event) {
  event.preventDefault();
  let id = document.getElementById("id").value;
  let nombre = document.getElementById("nombre").value;
  let apellidos = document.getElementById("apellidos").value;
  let edad = document.getElementById("edad").value;
  let telefono = document.getElementById("telefono").value;
  let ciudad = document.getElementById("ciudad").value;
  let direccion = document.getElementById("direccion").value;

  console.log(id, nombre, apellidos, edad, telefono, ciudad, direccion);
  let contactoTmp = {
    id,
    nombre,
    apellidos,
    edad,
    telefono,
    ciudad,
    direccion,
  };


  if (contactos.length === 0) {
      console.log('dentro de if')
      contactos.push(contactoTmp);
      swal("Contacto Creado!", "", "success");
      console.log(contactos);
      cargarDatos();
      localStorage.setItem('contactos', JSON.stringify(contactos))
      return;
    
  }

  if(contactos.length > 0 && contactos.find(contacto => contacto.id === id) === undefined) {
    console.log('dentro de if')
    contactos.push(contactoTmp);
    localStorage.setItem('contactos', JSON.stringify(contactos))
    swal("Contacto Creado!", "", "success");
    console.log(contactos);
    borrarTabla();
    cargarDatos();
    return;
  }

  swal("El id ya existe", "", "error");
}


function cargarDatos () {
    console.log("Cargar datos")
    const cuerpoTabla = document.getElementById("cuerpo-tabla");

  contactos.forEach(contacto => {
      console.log(contacto)
    const tr = document.createElement('tr');
    // tr.className = 'list-row';
    const tdId = document.createElement('td');
    const tdNombre = document.createElement('td');
    const tdApellidos = document.createElement('td');
    const tdEdad = document.createElement('td');
    const tdTelefono = document.createElement('td');
    const tdCiudad = document.createElement('td');
    const tdDireccion = document.createElement('td');
    const tdIconos = document.createElement('td');;
    
    tdId.innerText = contacto.id;
    // tdId.className = 'list-head-item';
    tdNombre.innerText = contacto.nombre;
    tdApellidos.innerText = contacto.apellidos;
    tdEdad.innerText = contacto.edad;
    tdTelefono.innerText = contacto.telefono;
    tdCiudad.innerText = contacto.ciudad;
    tdDireccion.innerText = contacto.direccion;
    tdIconos.innerHTML = `<a href="" class="subir">
    <svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-arrow-up-circle" width="24" height="24" viewBox="0 0 24 24" stroke-width="1.5" stroke="#00abfb" fill="none" stroke-linecap="round" stroke-linejoin="round">
        <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
        <circle cx="12" cy="12" r="9" />
        <line x1="12" y1="8" x2="8" y2="12" />
        <line x1="12" y1="8" x2="12" y2="16" />
        <line x1="16" y1="12" x2="12" y2="8" />
      </svg>
</a>
<a href="" id="eliminar">
    <svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-circle-x" width="24" height="24" viewBox="0 0 24 24" stroke-width="1.5" stroke="#ff2825" fill="none" stroke-linecap="round" stroke-linejoin="round">
        <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
        <circle cx="12" cy="12" r="9" />
        <path d="M10 10l4 4m0 -4l-4 4" />
      </svg>
</a>`;
    // tdName.className = 'list-head-item';
    // tdCompleted.innerText = task.completed ? "completada" : "sin completar";
    // tdCompleted.className = 'list-head-item';

    tr.appendChild(tdId);
    tr.appendChild(tdNombre);
    tr.appendChild(tdApellidos);
    tr.appendChild(tdEdad);
    tr.appendChild(tdTelefono);
    tr.appendChild(tdCiudad);
    tr.appendChild(tdDireccion);
    tr.appendChild(tdIconos);

    cuerpoTabla.appendChild(tr)
  });

  console.log('final funcion')
}


function borrarTabla() {
    const cuerpoTabla = document.getElementById("cuerpo-tabla");
  
    while (cuerpoTabla.lastChild) {
      cuerpoTabla.removeChild(cuerpoTabla.lastChild);
    }
  }


function eliminarContacto(event) {
    event.preventDefault();
    let id = document.getElementById('id-eliminar').value;
    if (contactos.length === 0) {
        swal("No hay usuarios", "", "error");
        return;
    }

    console.log(id +' id eliminar')
    if(contactos.find(contacto => contacto.id === id)) {
        
        let contact = dniSearch(id);
        contactos.splice(contact, 1);
        localStorage.setItem('contactos', JSON.stringify(contactos))
        swal("Contacto Eliminado!", "", "success");
        borrarTabla();
        cargarDatos();
        return;
    }else {
        swal("Id no existe", "", "error");
    }


}  


function topContacto(event) {
    event.preventDefault();
    let idTop = document.getElementById('id-top').value;
    if (contactos.length === 0) {
        swal("No hay usuarios", "", "error");
        return;
    }

    if(contactos.find(contacto => contacto.id === idTop)) {
        
        let contactIndex = dniSearch(idTop);
        let contact = contactos[contactIndex];
        contactos.splice(contactIndex, 1);
        contactos.unshift(contact);
        localStorage.setItem('contactos', JSON.stringify(contactos))
        swal("Contacto agregado al top!", "", "success");
        borrarTabla();
        cargarDatos();
    }else {
        swal("Id no existe", "", "error");
    }


} 




function dniSearch (dni) {
    let busqueda = contactos.findIndex((contacto) => contacto.id === dni);
    return busqueda
}
init();

//

// const contacto = {
//   id: 1234,
//   nombres: 'Ferney',
//   apellidos: 'Rodriguez',
//   edad: 30,
//   telefono: '555222',
//   ubicaciones: {
//     ciudad: 'Villavicencio',
//     direccion: 'calle 23 # 32 - 45',
//   },
// };

// const contacto2 = {
//   id: 12345,
//   nombres: 'Ada',
//   apellidos: 'School',
//   edad: 25,
//   telefono: '333222',
//   ubicaciones: {
//     ciudad: 'Bogota',
//     direccion: 'calle 123 # 62 - 48',
//   },
// };

// function contactAdd(contacto) {
//   contactos.push(contacto);
// }

// function dniSearch (dni) {
//   let busqueda = contactos.findIndex((contacto) => contacto.id === dni);

//   return busqueda
// }

// function contactRemove(dni) {

//   let contact = dniSearch(dni);
//   let borrar = contactos.splice(contact, 1);
// }

// function contactTop(dni) {

//   let contactIndex = dniSearch(dni);
//   let contact = contactos[contactIndex];
//   contactRemove(contactIndex);
//   contactos.unshift(contact);

// }

// contactAdd(contacto);
// contactAdd(contacto2);
// contactTop(12345)
// //contactRemove(12345)
