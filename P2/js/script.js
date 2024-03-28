document.addEventListener('DOMContentLoaded', () => {
  'use strict';

  const boton = document.getElementById("mostrarCom");
  const comentarios = document.getElementById("zonaEscondida");
  const form = document.querySelector('.needs-validation');
  const modalError = new bootstrap.Modal(document.getElementById('errorModal'));
  const modalSuccess = new bootstrap.Modal(document.getElementById('successModal'));

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
          modalError.show();
      } else {
          // Si el formulario es válido, prevenir el comportamiento por defecto y agregar el comentario
          event.preventDefault();
          agregarComentario();
          modalSuccess.show();
      }

      form.classList.add('was-validated');
  });

  function agregarComentario() {
      const nombre = document.getElementById('floatingName').value;
      const email = document.getElementById('floatingInput').value;
      const comentarioTexto = document.getElementById('floatingTextarea').value;
      
      const ahora = new Date();
      const fechaHora = ahora.getDate().toString().padStart(2, '0') +'-'+ (ahora.getMonth()+1).toString().padStart(2, '0')+'-'+ ahora.getFullYear().toString()+' ' + 
      ahora.getHours().toString().padStart(2,'0') + ':'+ahora.getMinutes().toString().padStart(2,'0');

      const nuevoComentario = document.createElement('div');
      nuevoComentario.classList.add('comment', 'prueba');
      nuevoComentario.innerHTML = 
          `<p id="autor">${nombre} (${email})</p>
          <p id="fecha"> ${fechaHora} </p>
          <p> Comentario: ${comentarioTexto}</p>`;

      comentarios.appendChild(nuevoComentario);   
  }

    // Array con las palabras prohibidas
    const palabrasProhibidas = ['puta', 'tractor'];
        
    const comentarioTexto = document.getElementById('floatingTextarea');

    // Función para reemplazar palabras prohibidas por asteriscos
    function censurar(texto) {
        palabrasProhibidas.forEach(palabra => {
            const expresion = new RegExp(palabra);
            const asteriscos = '*'.repeat(palabra.length);
            texto = texto.replace(expresion, asteriscos);
        });
        return texto;
    }

    // Escuchar por cambios en el campo de comentario
    comentarioTexto.addEventListener('keyup', () => {
        const textoOriginal = comentarioTexto.value;
        const textoCensurado = censurar(textoOriginal);
        comentarioTexto.value = textoCensurado;
    });
});

