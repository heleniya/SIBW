<?php
// Conexión a la base de datos
$mysqli = new mysqli('database', 'root', 'tiger', 'SIBW');
if ($mysqli->connect_error) {
    die("Connection failed: " . $mysqli->connect_error);
}

// Consulta para obtener las palabras prohibidas
$result = $mysqli->query("SELECT palabra FROM palabras_prohibidas");
$palabras_prohibidas = [];
while($row = $result->fetch_assoc()) {
    $palabras_prohibidas[] = $row['palabra'];
}

// Cierra la conexión
$mysqli->close();

// Devuelve las palabras prohibidas en formato JSON
echo json_encode($palabras_prohibidas);
?>
