<?php

function usuarioExiste($mysqli, $nick, $correo) {
    $sql = "SELECT COUNT(*) as count FROM usuarios WHERE nick = ? OR correo = ?";
    if ($stmt = $mysqli->prepare($sql)) {
        $stmt->bind_param("ss", $nick, $correo);
        $stmt->execute();
        $stmt->bind_result($count);
        $stmt->fetch();
        $stmt->close();
        
        if ($count > 0) {
            return true;
        } else {
            return false;
        }
    } else {
        return false;
    }
}

function verificarCredenciales($mysqli, $nick, $contraseña) {
    $sql = "SELECT contraseña FROM usuarios WHERE nick = ?";
    if ($stmt = $mysqli->prepare($sql)) {
        $stmt->bind_param("s", $nick);
        $stmt->execute();
        $stmt->bind_result($hashed_password);
        if ($stmt->fetch()) {
            $stmt->close();
            return password_verify($contraseña, $hashed_password);
        } else {
            $stmt->close();
            return false; // Usuario no encontrado
        }
    } else {
        return false; // Error en la preparación de la consulta
    }
}


?>