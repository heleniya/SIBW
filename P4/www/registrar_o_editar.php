<?php
session_start();
include('bd.php');
include('bdUsuarios.php');


if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $action = $_POST['action'];
    $nick = $_POST['username'];
    $correo = $_POST['email'];
    $contraseña = $_POST['password'];
    $hashed_password = !empty($contraseña) ? password_hash($contraseña, PASSWORD_DEFAULT) : null;

    $mysqli = new mysqli('database', 'root', 'tiger', 'SIBW');

    if ($mysqli->connect_error) {
        die('Connect Error: ' . $mysqli->connect_error);
    }

    if ($action === 'register') {
        // Registro de nuevo usuario
        if (usuarioExiste($mysqli, $nick, $correo)) {
            $_SESSION['message'] = 'Nombre de usuario o correo ya existen';
            $_SESSION['message_type'] = 'danger';
            header('Location: ../index.php');
            exit();
        }
        $sql = "INSERT INTO usuarios (nick, correo, contraseña, permisos) VALUES (?, ?, ?, 'registrado')";
        if ($stmt = $mysqli->prepare($sql)) {
            $stmt->bind_param("sss", $nick, $correo, $hashed_password);
            $stmt->execute();
            $stmt->close();
        }
        $_SESSION['user'] = $nick;
        $_SESSION['correo'] = $correo;
    } elseif ($action === 'edit' && isset($_SESSION['user'])) {
        // Edición de perfil de usuario existente
        $current_nick = $_SESSION['user'];

        if ($nick !== $current_nick && usuarioExiste($mysqli, $nick, $correo)) {
            $_SESSION['message'] = 'Nombre de usuario o correo ya existen';
            $_SESSION['message_type'] = 'danger';
            header('Location: ../index.php');
            exit();
        }

        $sql = "UPDATE usuarios SET nick = IFNULL(NULLIF(?, ''), nick), correo = IFNULL(NULLIF(?, ''), correo)";
        if ($hashed_password) {
            $sql .= ", contraseña = ?";
        }
        $sql .= " WHERE nick = ?";
        if ($stmt = $mysqli->prepare($sql)) {
            if ($hashed_password) {
                $stmt->bind_param("ssss", $nick, $correo, $hashed_password, $current_nick);
            } else {
                $stmt->bind_param("sss", $nick, $correo, $current_nick);
            }
            $stmt->execute();
            $stmt->close();
        }
        // Actualizar las variables de sesión solo si los campos no están vacíos
        if (!empty($nick)) {
            $_SESSION['user'] = $nick;
        }
        if (!empty($correo)) {
            $_SESSION['correo'] = $correo;
        }
    }

    $mysqli->close();
    header('Location: index.php');
    exit();
}
?>
