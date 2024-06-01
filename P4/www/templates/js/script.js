/*
    Helena Ruiz Aranda 
    A2 
    01/04/2024
*/

//Un listener para que empiece a ejecutarse cuando todo el contenido este cargado
document.addEventListener('DOMContentLoaded', () => {
    'use strict';
  
    //Obtiene referencias a partes importantes del html: boton mostrar comentarios, zona de comentarios escondidad,  formulario de validacion y los dialogos modales
    const boton = document.getElementById("mostrarCom");
    const comentarios = document.getElementById("zonaEscondida");
    const form = document.querySelector('.needs-validation');
    const modalError = new bootstrap.Modal(document.getElementById('errorModal'));
    const modalSuccess = new bootstrap.Modal(document.getElementById('successModal'));

    const actividadId = document.getElementById('comentarioForm').dataset.actividadId;
  
    //Cuando se le de al boton de mostrar comentarios se activara la funcion de MOSTRAR.
    boton.addEventListener('click', funcion_mostrar);
  
    //Funcion que permite que se muestren los comentarios
    function funcion_mostrar() {    
        //Cambia los comentarios a la clase visible para que se muestren u oculten
        comentarios.classList.toggle('visible');
        
        //Si estan visibles  en el texto del boton pasara de poner MOSTRAR a poner OCULTAR, y el boton cambiara de posicion
        if (comentarios.classList.contains('visible')) {
            boton.style.transform = 'translateX(-45.25vw) translateY(-10vh)';
            boton.textContent = 'Ocultar comentarios';
        //Si no esta visible el boton volvera a su forma original y se ocultaran los comentarios de nuevo
        } else {
            boton.style.transform = 'rotate(-90deg)';
            comentarios.style.marginLeft = '100%';
            boton.textContent = 'Mostrar comentarios';
        }
    }
  
    //Listener para el evento submit del formulario
    form.addEventListener('submit', function (event) {
        console.log('Formulario enviado');
        // Verifica si el formulario es válido
        if (!form.checkValidity()) {
            // Previene el envio del formulario y muestra un modal de error si el formulario no es válido.
            event.preventDefault();
            event.stopPropagation();
            modalError.show();
            console.log('Formulario inválido');  // Registro de formulario inválido
        } else {
            // Si el formulario es válido, prevenir el comportamiento por defecto y agregar el comentario
            event.preventDefault();
            console.log('Formulario válido');  // Registro de formulario válido
	        mandarComentario();
        }
        //Añade la clase 'was-validated' al formulario para mostrar los estados de validación
        form.classList.add('was-validated');
    });
  	
  	
      let palabrasProhibidas = [];

    // Función para cargar palabras prohibidas desde el servidor
    function cargarPalabrasProhibidas() {
        fetch('obtener_prohibidas.php') 
        .then(response => response.json())
        .then(data => {
            palabrasProhibidas = data;
            console.log(palabrasProhibidas); // Para verificar que se cargan correctamente
        })
        .catch(error => console.error('Error al cargar palabras prohibidas:', error));
    }

    // Llamar a la función al cargar la página
    cargarPalabrasProhibidas();
          
      //Recojo lo que se introduce en el campo del comentario en el formulario
      const comentarioTexto = document.getElementById('floatingTextarea');
  
      // Función para reemplazar palabras prohibidas por asteriscos
      function censurar(texto) {
          //Recorre cada palabra prohibida y la reemplaza por asteriscos en el texto
          palabrasProhibidas.forEach(palabra => {
              //Crea una expresión regular para la palabra actual y reemplaza su ocurrencia en el texto.
              const expresion = new RegExp(palabra);
              const asteriscos = '*'.repeat(palabra.length);
              texto = texto.replace(expresion, asteriscos);
          });
          return texto;
      }
  
      //Escuchador de eventos para detectar y censurar palabras prohibidas cada vez que el usuario escribe en el formulario
      comentarioTexto.addEventListener('input', () => {
          const textoOriginal = comentarioTexto.value;
          const textoCensurado = censurar(textoOriginal);
          comentarioTexto.value = textoCensurado;
      });
      
    function mandarComentario() {
        const formData = new FormData(form); // Recoger los datos del formulario
        console.log('Datos del formulario:', Array.from(formData.entries()));  // Registro de datos del formulario
        fetch('actividad.php?ev=' + actividadId, {
            method: 'POST',
            body: formData
        })
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                console.log('Comentario enviado correctamente');  // Registro de éxito
                modalSuccess.show();
            } else {
                console.log('Error al enviar comentario:', data.error);  // Registro de error
                modalError.show();
            }
        })
        .catch(error => {
            console.error('Error al enviar el formulario:', error);
            modalError.show();
        });
    }

  });
