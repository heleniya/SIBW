<?php
session_start();
include('bd.php');

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $action = $_POST['action'];
    $nick = $_POST['username'];
    $correo = $_POST['email'];
    $contraseña = $_POST['password'];
    $hashed_password = password_hash($contraseña, PASSWORD_DEFAULT);

    $mysqli = new mysqli('localhost', 'root', 'tiger', 'SIBW');

    if ($mysqli->connect_error) {
        die('Connect Error: ' . $mysqli->connect_error);
    }

    if ($action === 'register') {
        // Registro de nuevo usuario
        $sql = "INSERT INTO usuarios (nick, correo, contraseña, permisos) VALUES (?, ?, ?, 'usuario')";
        if ($stmt = $mysqli->prepare($sql)) {
            $stmt->bind_param("sss", $nick, $correo, $hashed_password);
            $stmt->execute();
            $stmt->close();
        }
        $_SESSION['user'] = $nick;
    } elseif ($action === 'edit' && isset($_SESSION['user'])) {
        // Edición de perfil de usuario existente
        $current_nick = $_SESSION['user'];
        $sql = "UPDATE usuarios SET nick = ?, correo = ?, contraseña = ? WHERE nick = ?";
        if ($stmt = $mysqli->prepare($sql)) {
            $stmt->bind_param("ssss", $nick, $correo, $hashed_password, $current_nick);
            $stmt->execute();
            $stmt->close();
        }
        $_SESSION['user'] = $nick; // Actualizar la sesión con el nuevo nombre de usuario
    }

    $mysqli->close();
    header('Location: index.php');
    exit();
}
?>
