<?php
session_start();
include './bdUsuarios.php';

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $nick = $_POST['username'];
    $contraseña = $_POST['password'];

    if (empty($nick) || empty($contraseña)) {
        $_SESSION['message'] = 'Todos los campos son obligatorios';
        $_SESSION['message_type'] = 'danger';
        header('Location: ../index.php');
        exit();
    }

    $mysqli = new mysqli('database', 'root', 'tiger', 'SIBW');

    if ($mysqli->connect_error) {
        $_SESSION['message'] = 'Error de conexión a la base de datos: ' . $mysqli->connect_error;
        $_SESSION['message_type'] = 'danger';
        header('Location: ../index.php');
        exit();
    }

    if (verificarCredenciales($mysqli, $nick, $contraseña)) {
        $_SESSION['user'] = $nick;

        // Obtén el correo del usuario y guárdalo en la sesión
        $stmt = $mysqli->prepare("SELECT correo FROM usuarios WHERE nick = ?");
        $stmt->bind_param("s", $nick);
        $stmt->execute();
        $stmt->bind_result($correo);
        if ($stmt->fetch()) {
            $_SESSION['correo'] = $correo;
        }
        $stmt->close();

        error_log('Inicio de sesión exitoso: ' . $_SESSION['user']);
        $_SESSION['message'] = 'Inicio de sesión exitoso';
        $_SESSION['message_type'] = 'success';
        header('Location: ../index.php');
        exit();
    } else {
        error_log('Error de inicio de sesión: Nombre de usuario o contraseña incorrectos');
        $_SESSION['message'] = 'Nombre de usuario o contraseña incorrectos';
        $_SESSION['message_type'] = 'danger';
        header('Location: ../index.php');
        exit();
    }
} else {
    error_log('Método de solicitud no válido');
    $_SESSION['message'] = 'Método de solicitud no válido';
    $_SESSION['message_type'] = 'danger';
    header('Location: ../index.php');
    exit();
}
?>
