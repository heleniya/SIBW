/*
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
*/

document.addEventListener('DOMContentLoaded', () => {
  'use strict';

  const boton = document.getElementById("mostrarCom");
  const comentarios = document.getElementById("zonaEscondida");
  const form = document.querySelector('.needs-validation');
  const modalExample = new bootstrap.Modal(document.getElementById('exampleModal'));

  boton.addEventListener('click', funcion_mostrar);

  function funcion_mostrar() {    
      comentarios.classList.toggle('visible');
      
      if (comentarios.classList.contains('visible')) {
          boton.style.transform = 'translateX(-45.25vw) translateY(-10vh)';
          boton.textContent = 'Ocultar comentarios';
      } else {
          boton.style.transform = 'rotate(-90deg)';
          comentarios.style.marginLeft = '100%';
          boton.textContent = 'Mostrar comentarios';
      }
  }

  form.addEventListener('submit', function (event) {
      if (!form.checkValidity()) {
          event.preventDefault();
          event.stopPropagation();
          modalExample.show();
      } else {
          // Si el formulario es válido, prevenir el comportamiento por defecto y agregar el comentario
          event.preventDefault();
          agregarComentario();
          modalExample.hide();
      }

      form.classList.add('was-validated');
  });

  function agregarComentario() {
      const nombre = document.getElementById('floatingName').value;
      const email = document.getElementById('floatingInput').value;
      const comentarioTexto = document.getElementById('floatingTextarea').value;
      
      const nuevoComentario = document.createElement('div');
      nuevoComentario.classList.add('comment', 'prueba');
      nuevoComentario.innerHTML = `
          <p id="autor"><strong>${nombre}</strong> (${email})</p>
          <p>${comentarioTexto}</p>
      `;

      comentarios.appendChild(nuevoComentario);
      
      

  }
});

      // Opcional: Limpiar los campos del formulario
      form.reset();
