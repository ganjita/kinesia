// Obtén la ruta de la página actual
var rutaActual = window.location.pathname;


  document.addEventListener('DOMContentLoaded', function() {
    // Obtener el elemento input por su id
    var input = document.getElementById("fecha");
    
  // Obtener la fecha actual como un objeto Date
  var ahora = new Date();
  // Formatear la fecha actual como una cadena en el formato AAAA-MM-DD
  var valor =
    ahora.getFullYear() +
    "-" +
    ("0" + (ahora.getMonth() + 1)).slice(-2) +
    "-" +
    ("0" + ahora.getDate()).slice(-2);
  // Asignar el valor al input
  input.value = valor;

  // Función para cambiar el día del input según el parámetro delta
  function cambiarDia(delta) {
    // Obtener la fecha del input como un objeto Date
    var fecha = new Date(input.value);
    // Sumar o restar un día al objeto Date según el parámetro delta
    fecha.setDate(fecha.getDate() + delta);
    // Formatear la nueva fecha como una cadena en el formato AAAA-MM-DD
    var nuevoValor =
      fecha.getFullYear() +
      "-" +
      ("0" + (fecha.getMonth() + 1)).slice(-2) +
      "-" +
      ("0" + fecha.getDate()).slice(-2);
    // Asignar el nuevo valor al input
    input.value = nuevoValor;
  }
});

/////////////////////////////////////////////////////////////////////////////////////////////////
//script para seleccionar un paciente de la busqueda y se autocomplete el formulario de turno////
/////////////////////////////////////////////////////////////////////////////////////////////////

$(document).ready(function () {
  // Agrega el evento de clic a las filas de la tabla
  $("tr[data-id]").click(function () {
    // Obtén los valores de los elementos td
    var idPaciente = $(this).find("td.id_usuario").text();
    var nombre = $(this).find("td.nombre").text();
    var apellido = $(this).find("td.apellido").text();
    var direccion = $(this).find("td.direccion").text();
    var osocial = $(this).find("td.osocial").text();
    var plan = $(this).find("td.plan").text();
    var nroafiliado = $(this).find("td.nroafiliado").text();
    var dni = $(this).find("td.dni").text();
    var telefono = $(this).find("td.telefono").text();

    var nombreCompleto = nombre + " " + apellido;

    // Rellena el formulario con los valores obtenidos
    $("#id-paciente").val(idPaciente);
    $("#nombre").val(nombreCompleto);
    $("#telefono").val(dni);
    $("#direccion").val(direccion);
    $("#osocial").val(osocial);
    $("#plan").val(plan);
    $("#nroafiliado").val(nroafiliado);
    $("#telefono").val(telefono);
  });
});

//////////////////////////////////////////////////////////////////////////////////////////////////////////////
//SELECCIONAR EL MEDICO DEL DROPDOWN EN NUEVO TURNO Y ENVIAR EL TEXTO DEL DROPDOWN PARA LA BASE DE DATOS/////
/////////////////////////////////////////////////////////////////////////////////////////////////////////////

$(document).ready(function () {
  $(".dropdown-menu button").click(function () {
    var medicoId = $(this).data("value"); // Obtén el valor de data-value
    var medicoNombre = $(this).text(); // Obtén el texto del elemento seleccionado

    $("#medicoSeleccionado").val(medicoNombre); // Asigna el nombre al campo oculto
    $("#medico").text(medicoNombre); // Actualiza el texto del botón dropdown

    $(this).closest(".dropdown-menu").removeClass("show"); // Oculta el menú desplegable
  });
});

/////////////////////////////////////////////////////////////////////////////////
//OBTENER EL VALOR DEL DROPDOWN EN TURNOS POR MEDICO Y PROCESAR EL FORMULARIO////
/////////////////////////////////////////////////////////////////////////////////

// Verifica si estás en la página que necesita el código
if (rutaActual === "localhost/kinesia/buscar_paciente.php") {
  // Coloca aquí el código que deseas cargar solo en esa página
var medicoButton = document.getElementById("medico");

medicoButton.addEventListener("click", function (event) {
  event.preventDefault(); // Evitar la acción predeterminada del botón

  // Mostrar el menú desplegable al hacer clic en el botón
  this.nextElementSibling.classList.toggle("hidden");
});
}

/////////////////////////////////////////////////////////////////////////////////////////////////////////
//////MUESTRA LOS MEDICOS DE LA BASE DE DATOS EN UN BOTON QUE TIENE LA CLASE medicoTurnoNuevo////////////
///////////////////////////////////////// De TURNOS_MEDICOS.PHP ////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////////

$(document).ready(function () {
  $(".medicoTurnoNuevo").click(function (e) {
    e.preventDefault(); // Evitar el comportamiento predeterminado del enlace

    // Obtener el valor de data-value
    var medicoId = $(this).text();

    // Realizar la solicitud Ajax
    $.ajax({
      url: "app/obtenerturnosmedico1.php", // URL del archivo PHP que realiza la consulta
      type: "POST",
      data: { medicoSeleccionado: medicoId }, // Datos que se enviarán al servidor (en este caso, el ID del médico)
      dataType: "html", // Tipo de datos esperados en la respuesta (puede ser 'json' si el servidor devuelve JSON)
      success: function (response) {
        // Actualizar la interfaz con los resultados obtenidos
        $("#resultadoTurnos").html(response);
      },
      error: function (xhr, status, error) {
        // Manejar errores de la solicitud Ajax
        console.log(xhr.responseText);
      },
    });
  });
});

////////////////////////////////////////////////////////////////////
/////CLICK EN LA FILA DE LOS TURNOS Y SE ABRE LA VENTANA POPUP/////
///////////////////////////////////////////////////////////////////

// Obtener el elemento que deseas bloquear
var fila = document.getElementById("fila-bloqueada");

// Manejar el evento de clic en la fila
fila.addEventListener("click", function (event) {
  // Detener la propagación del evento
  event.stopPropagation();
});

// Obtener la tabla y el cuerpo de la tabla
var tabla = document.querySelector(".table");
var tablaBody = document.getElementById("resultadoTurnos");

// Agregar el evento de clic a las filas generadas dinámicamente
tabla.addEventListener("click", function (event) {
  var fila = event.target.closest("tr");
  if (fila) {
    // Obtener los datos de la fila
    var medico = fila.cells[0].textContent;
    var fecha = fila.cells[1].textContent;
    var hora = fila.cells[2].textContent;
    var paciente = fila.cells[3].textContent;
    var telefono = fila.cells[4].textContent;
    var obraSocial = fila.cells[5].textContent;
    var plan = fila.cells[6].textContent;
    var nroAfiliado = fila.cells[7].textContent;

    // Construir el contenido del detalle del turno
    var detalleHtml =
      "<p><strong>Médico:</strong> " +
      medico +
      "</p>" +
      "<p><strong>Fecha:</strong> " +
      fecha +
      "</p>" +
      "<p><strong>Hora:</strong> " +
      hora +
      "</p>" +
      "<p><strong>Paciente:</strong> " +
      paciente +
      "</p>" +
      "<p><strong>Teléfono:</strong> " +
      telefono +
      "</p>" +
      "<p><strong>O.Social:</strong> " +
      obraSocial +
      "</p>" +
      "<p><strong>Plan:</strong> " +
      plan +
      "</p>" +
      "<p><strong>Nro.Afiliado:</strong> " +
      nroAfiliado +
      "</p>";

    // Insertar el contenido del detalle del turno en el modal
    document.getElementById("detalleTurnoModalBody").innerHTML = detalleHtml;

    // Obtener el ID del turno
    var idTurno = fila.getAttribute("data-idturno");

    // Establecer el ID del turno en los campos ocultos de los popups para utilizarlo en la base de datos
    document.getElementById("turnoIdFecha").value = idTurno;
    document.getElementById("turnoIdHora").value = idTurno;
    document.getElementById("turnoIdEliminar").value = idTurno;


    // Abrir el modal
    $("#detalleTurnoModal").modal("show");
  }
});


// Manejar el evento de clic en "Editar Fecha"
document
  .getElementById("editarFechaBtn")
  .addEventListener("click", function () {
    // Abrir el popup para editar la fecha
    $("#editarFechaModal").modal("show");
  });

// Manejar el evento de clic en "Editar Hora"
document.getElementById("editarHoraBtn").addEventListener("click", function () {
  // Abrir el popup para editar la hora
  $("#editarHoraModal").modal("show");
});

// Manejar el evento de clic en "Intercambiar Turnos"
document
  .getElementById("intercambiarTurnoBtn")
  .addEventListener("click", function () {
    // Abrir el popup para editar la fecha
    $("#cambiarTurnoModal").modal("show");
  });

///////////////////////////////////////////////////////
// Manejar el evento de clic en "Confirmar" (Fecha)////
//////////////////////////////////////////////////////

document
  .getElementById("confirmarFechaBtn") .addEventListener("click", function () {
    // Obtener el valor de la nueva fecha
    var nuevaFecha = document.getElementById("nuevaFecha").value;

    // Obtener el ID del turno
    var idTurno = document.getElementById("turnoIdFecha").value;

    // Realizar la consulta para cambiar la hora_turno en la base de datos utilizando el ID del turno y la nueva hora
    var xhr = new XMLHttpRequest();
    xhr.open("POST", "app/actualizar_hora_fecha.inc.php", true);
    xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    xhr.onreadystatechange = function () {
      if (xhr.readyState === 4 && xhr.status === 200) {
        // La consulta se ejecutó correctamente
        console.log(xhr.responseText);
      } else {
        // Error al ejecutar la consulta
        console.log("Error al actualizar la hora");
      }
    };
    xhr.send(
      "nuevaFecha=" +
        encodeURIComponent(nuevaFecha) +
        "&idTurno=" +
        encodeURIComponent(idTurno)
    );

    // Cerrar el popup
    $("#editarFechaModal").modal("hide");
  });
////////////////////////////////////////////////////
// Manejar el evento de clic en "Confirmar" (Hora)//
////////////////////////////////////////////////////

document
  .getElementById("confirmarHoraBtn")
  .addEventListener("click", function () {
    // Obtener el valor de la nueva hora
    var nuevaHora = document.getElementById("nuevaHora").value;

    // Obtener el ID del turno
    var idTurno = document.getElementById("turnoIdHora").value;

    // Realizar la consulta para cambiar la hora_turno en la base de datos utilizando el ID del turno y la nueva hora
    var xhr = new XMLHttpRequest();
    xhr.open("POST", "app/actualizar_hora_fecha.inc.php", true);
    xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    xhr.onreadystatechange = function () {
      if (xhr.readyState === 4 && xhr.status === 200) {
        // La consulta se ejecutó correctamente
        console.log(xhr.responseText);
      } else {
        // Error al ejecutar la consulta
        console.log("Error al actualizar la hora");
      }
    };
    xhr.send(
      "nuevaHora=" +
        encodeURIComponent(nuevaHora) +
        "&idTurno=" +
        encodeURIComponent(idTurno)
    );

    // Cerrar el popup
    $("#editarHoraModal").modal("hide");
  });

// Manejar el evento de cierre del popup (hidden.bs.modal)
$("#editarFechaModal").on("hidden.bs.modal", function () {});

///////////////////////////////////////////////////////////////////////////////////////////////////////////
///     CIERRE DE VENTANAS MODAL Y SOMBRAS DE FONDO SOLUCION NO PODER ABRIR 2 VECES UN MISMO BOTON    /////
///////////////////////////////////////////////////////////////////////////////////////////////////////////

// Obtener los botones que abren las ventanas modales
var openButtons = document.querySelectorAll("[data-bs-toggle='modal']");

// Asignar un evento de clic a cada botón que abre una ventana modal
openButtons.forEach(function (button) {
  button.addEventListener("click", function () {
    // Obtener el ID de la ventana modal a abrir
    var targetModalId = button.getAttribute("data-bs-target");
    var targetModal = document.querySelector(targetModalId);

    // Abrir la ventana modal
    var modal = new bootstrap.Modal(targetModal);
    modal.show();

    // Agregar la clase "modal-open" al elemento <body>
    document.body.classList.add("modal-open");
  });
});

// Obtener todos los botones de cerrar
var closeButtons = document.querySelectorAll(".btn-close");

// Asignar un evento de clic a cada botón de cerrar
closeButtons.forEach(function (button) {
  button.addEventListener("click", function () {
    // Obtener el modal correspondiente al botón de cerrar
    var modal = button.closest(".modal");

    // Cerrar la ventana modal
    var bsModal = bootstrap.Modal.getInstance(modal);
    bsModal.hide();

    // Si es la ventana principal, no eliminar la sombra
    if (modal.getAttribute("id") !== "detalleTurnoModal") {
      return;
    }

    // Eliminar la clase "modal-open" del elemento <body>
    document.body.classList.remove("modal-open");

    // Eliminar el estilo de fondo oscurecido aplicado por Bootstrap
    var modalBackdrops = document.getElementsByClassName("modal-backdrop");
    for (var i = 0; i < modalBackdrops.length; i++) {
      modalBackdrops[i].parentNode.removeChild(modalBackdrops[i]);
    }
  });
});

/////////////////////////////////////////////////////////////////////////
////////POPUP PARA ELIMINAR TURNO Y VENTANA DE CONFIRMACION//////////////
////////////////////////////////////////////////////////////////////////

// Obtener el botón de eliminar turno
var eliminarTurnoBtn = document.querySelector(".btn-danger");

// Obtener el botón de confirmar eliminación
var confirmarEliminacionBtn = document.getElementById("confirmarEliminacionBtn");

// Asignar un evento de clic al botón de eliminar turno
eliminarTurnoBtn.addEventListener("click", function () {
  // Mostrar el modal de confirmación
  var confirmacionModal = new bootstrap.Modal(document.getElementById("confirmacionModal"));
  confirmacionModal.show();
});

// Asignar un evento de clic al botón de confirmar eliminación
confirmarEliminacionBtn.addEventListener("click", function () {
  // Obtener el ID del turno
  var idTurno = document.getElementById("turnoIdFecha").value;

  // Realizar la lógica para eliminar el turno en la base de datos
  var xhr = new XMLHttpRequest();
  xhr.open("POST", "app/eliminar_turno.php", true);
  xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
  xhr.onreadystatechange = function () {
    if (xhr.readyState === 4 && xhr.status === 200) {
      // La consulta se ejecutó correctamente
      console.log(xhr.responseText);
    } else {
      // Error al ejecutar la consulta
      console.log("Error al Eliminar el turno");
    }
  };

  xhr.send("idTurno=" + idTurno);

  // Cerrar el modal de confirmación
  var confirmacionModal = bootstrap.Modal.getInstance(document.getElementById("confirmacionModal"));
  confirmacionModal.hide();
});

