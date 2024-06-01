<?php
function getEvento($idEv) {
  
  $mysqli = new mysqli("database", "root", "tiger", "SIBW");
  if ($mysqli->connect_errno) {
    echo ("Fallo al conectar: " . $mysqli->connect_error);
  }

  $stmt = $mysqli->prepare("SELECT id, nombre, fecha, precio, descripcion, imagen1, imagen2 FROM actividades WHERE id = ?");
  $stmt->bind_param("i", $idEv); // 'i' indica que la variable es de tipo entero
  $stmt->execute();
  $res = $stmt->get_result();
  
  $actividad = array('nombre' => 'XXX', 'fecha' => '0000-00-00', 'precio' => 'YYY', 'descripcion' => 'AAA' );
  
  if ($res->num_rows > 0) {
    $row = $res->fetch_assoc();
    $actividad = array('id' => $row['id'], 'nombre' => $row['nombre'], 'fecha' => $row['fecha'], 'precio' => $row['precio'], 'descripcion' => $row['descripcion'], 'imagen1' => $row['imagen1'], 'imagen2' => $row['imagen2']);
  }
  
  $stmt->close();
  $mysqli->close();
  
  return $actividad;
}

function obtenerImagenesHastaId($maxId) {
    
    $mysqli = new mysqli('database', 'root', 'tiger', 'SIBW');

    if ($mysqli->connect_error) {
        die('Error de conexión: ' . $mysqli->connect_error);
    }

    // Prepara la consulta para seleccionar imágenes con ID hasta 9
    $stmt = $mysqli->prepare("SELECT id, ruta, descripcion FROM imagenes WHERE id <= ?");
    $stmt->bind_param('i', $maxId); // 'i' significa que el parámetro es un entero
    $stmt->execute();
    $resultado = $stmt->get_result();

    $imagenes = [];

    if ($resultado->num_rows > 0) {
        while ($fila = $resultado->fetch_assoc()) {
            $imagenes[] = $fila;
        }
    }

    $stmt->close();
    $mysqli->close();

    return $imagenes;
}



function obtenerComentarios($actividadId) {
    $mysqli = new mysqli('database', 'root', 'tiger', 'SIBW');

    if ($mysqli->connect_error) {
        die('Error de conexión: ' . $mysqli->connect_error);
    }
    
    $sql = "SELECT autor, fecha, texto FROM comentarios WHERE actividad_id = ?";
    $comentarios = [];

    // Preparar la declaración para evitar inyección de SQL
    if ($stmt = $mysqli->prepare($sql)) {  
        $stmt->bind_param("i", $actividadId);
        $stmt->execute();
        $resultado = $stmt->get_result();

        if ($resultado->num_rows > 0) {
            while ($fila = $resultado->fetch_assoc()) {
                $comentarios[] = $fila;
            }
        } else {
            // No hay comentarios, agrega un comentario ficticio
            $comentarios[] = [
                'autor' => 'Sistema',
                'fecha' => date('Y-m-d H:i:s'), // Fecha actual
                'texto' => 'No hay comentarios aún. ¡Sé el primero en comentar!'
            ];
        }

        $stmt->close();
    } else {
        
        die('Error en la preparación de la sentencia: ' . $mysqli->error);
    }

    $mysqli->close();  
    return $comentarios;
}

?>
