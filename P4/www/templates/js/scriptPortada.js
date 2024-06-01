document.addEventListener('DOMContentLoaded', () => {
    'use strict';

    console.log('scriptPortada.js cargado correctamente'); // Mensaje de depuración
    // Referencias a las modales y botones
    var loginModal = document.getElementById('loginModal');
    var registerModal = document.getElementById('registerModal');
    var loginBtn = document.getElementById('loginBtn');
    var registerBtn = document.getElementById('registerBtn');
    var editProfileBtn = document.getElementById('editProfileBtn');
    var closeLogin = document.getElementById('closeLogin');
    var closeRegister = document.getElementById('closeRegister');
    var registerModalTitle = document.getElementById('registerModalTitle');
    var submitBtn = document.getElementById('submitBtn');
    var formAction = document.getElementById('formAction');
    var registerForm = document.getElementById('registerForm');

    console.log('Referencias de botones:', loginBtn, registerBtn, editProfileBtn);

    // Cuando el usuario hace clic en el botón de login, se abre la modal de login
    if (loginBtn) {
        loginBtn.onclick = function(event) {
            event.preventDefault(); // Evita el comportamiento predeterminado del enlace
            loginModal.style.display = "block";
            console.log('Botón de inicio de sesión clicado');
        }
    }

    // Cuando el usuario hace clic en el botón de registro, se abre la modal de registro
    if (registerBtn) {
        registerBtn.onclick = function(event) {
            event.preventDefault(); // Evita el comportamiento predeterminado del enlace
            registerModalTitle.textContent = 'Registrarse';
            submitBtn.textContent = 'Registrarse';
            formAction.value = 'register';
            registerModal.style.display = "block";
            console.log('Botón de registro clicado');
            // Campos obligatorios solo para registro
            document.getElementById('username').required = true;
            document.getElementById('email').required = true;
            document.getElementById('password').required = true;
        }
    }

    // Cuando el usuario hace clic en el botón de editar perfil, se abre la modal de registro pero como editar perfil
    if (editProfileBtn) {
        editProfileBtn.onclick = function(event) {
            event.preventDefault(); // Evita el comportamiento predeterminado del enlace
            registerModalTitle.textContent = 'Editar perfil';
            submitBtn.textContent = 'Guardar cambios';
            formAction.value = 'edit';
            registerModal.style.display = "block";
            console.log('Botón de editar perfil clicado');
            // Campos opcionales para editar perfil
            document.getElementById('username').required = false;
            document.getElementById('email').required = false;
            document.getElementById('password').required = false;

            
        }
    }

    // Cuando el usuario hace clic en <span> (x), se cierra la modal de login
    if (closeLogin) {
        closeLogin.onclick = function() {
            loginModal.style.display = "none";
        }
    }

    // Cuando el usuario hace clic en <span> (x), se cierra la modal de registro
    if (closeRegister) {
        closeRegister.onclick = function() {
            registerModal.style.display = "none";
        }
    }

    // Cuando el usuario hace clic fuera de la modal, se cierra la modal
    window.onclick = function(event) {
        if (event.target == loginModal) {
            loginModal.style.display = "none";
        }
        if (event.target == registerModal) {
            registerModal.style.display = "none";
        }
    }

    registerForm.onsubmit = function(event) {
        console.log('Formulario enviado');
        console.log('Acción:', formAction.value);
        console.log('Nombre de usuario:', document.getElementById('username').value);
        console.log('Correo:', document.getElementById('email').value);
        console.log('Contraseña:', document.getElementById('password').value);
    };

});
