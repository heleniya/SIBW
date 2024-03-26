const boton = document.getElementById("mostrarCom");
var comentarios = document.getElementById("zonaEscondida");

function funcion_mostrar() {    
    comentarios.classList.toggle('visible');
    
    if (comentarios.classList.contains('visible')) {
        boton.style.transform = 'translateX(-45.25vw) translateY(-10vh)'; // Mueve el botón hacia la izquierda

        boton.textContent = 'Ocultar comentarios'; // Cambia el texto al mostrar los comentarios
    } else {
        boton.style.transform = 'rotate(-90deg)'; // Devuelve el botón a su posición original
        comentarios.style.marginLeft = '100%'; // Oculta la sección moviéndola fuera de la vista
        boton.textContent = 'Mostrar comentarios'; // Vuelve al texto original al ocultar los comentarios
    }
}

boton.addEventListener('click', funcion_mostrar);

//boostrap
document.addEventListener('DOMContentLoaded', (event) => {
    'use strict';
  
    // Fetch all the forms we want to apply custom Bootstrap validation styles to
    const forms = document.querySelectorAll('.needs-validation');
  
    // Loop over them and prevent submission
    Array.prototype.slice.call(forms)
      .forEach(function (form) {
        form.addEventListener('submit', function (event) {
          if (!form.checkValidity()) {
            event.preventDefault();
            event.stopPropagation();
          }
  
          form.classList.add('was-validated');
        }, false);
      });
  });

  document.addEventListener('DOMContentLoaded', (event) => {
    document.getElementById('formId').addEventListener('submit', function(event) {
        const emailInput = document.getElementById('customEmail');
        const regex = new RegExp('[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$');
        if (!regex.test(emailInput.value)) {
            // Prevenir la entrega del formulario
            event.preventDefault();
            // Mostrar feedback invalido
            emailInput.nextElementSibling.style.display = 'block';
            emailInput.classList.add('is-invalid');
        } else {
            // Ocultar feedback si el email es valido
            emailInput.nextElementSibling.style.display = 'none';
            emailInput.classList.remove('is-invalid');
        }
    });
});
  