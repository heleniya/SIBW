const boton = document.getElementById("mostrarCom");
var comentarios = document.getElementById("zonaEscondida");

function funcion_mostrar() {    
    comentarios.classList.toggle('visible');
    
    if (comentarios.classList.contains('visible')) {
        boton.style.transform = 'translateX(-44.5vw) translateY(-10vh)'; // Mueve el botón hacia la izquierda
        boton.style.transform =
        comentarios.style.marginLeft = '0'; // Asegúrate de que la sección se mueva hacia la izquierda
    } else {
        boton.style.transform = 'rotate(-90deg)'; // Devuelve el botón a su posición original
        comentarios.style.marginLeft = '100%'; // Oculta la sección moviéndola fuera de la vista
    }
}

boton.addEventListener('click', funcion_mostrar);
