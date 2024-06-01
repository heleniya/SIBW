<?php
require_once 'vendor/autoload.php';
include("bd.php");

session_start();
error_log('Inicio de actividad.php');
error_log('Usuario en la sesión: ' . (isset($_SESSION['user']) ? $_SESSION['user'] : 'No hay usuario en la sesión'));

$loader = new \Twig\Loader\FilesystemLoader('./templates');
$twig = new \Twig\Environment($loader);

$twig->addGlobal('session', $_SESSION);

if (isset($_GET['ev'])) {
    $idEv = $_GET['ev'];
} else {	
    $idEv = -1;
}


// Procesar el formulario
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    header('Content-Type: application/json');
    $response = ['success' => false]; // Inicializa el array de respuesta

    if (!isset($_SESSION['user'])) {
        $response['error'] = 'Debes iniciar sesión para enviar comentarios';
        echo json_encode($response);
        exit();
    }
    
    if (isset($_POST['texto'])) {
        $autor = $_SESSION['user']; // Obtiene el nombre del usuario de la sesión
        $texto = $_POST['texto'];
        $actividad_id = $_GET['ev'] ?? 0;

        $mysqli = new mysqli('database', 'root', 'tiger', 'SIBW');

        if ($mysqli->connect_error) {
            $response['error'] = 'Error de conexión a la base de datos';
            echo json_encode($response);
            exit();
        }

        $sql = "INSERT INTO comentarios (autor, texto, actividad_id, fecha) VALUES (?, ?, ?, NOW())";
        if ($stmt = $mysqli->prepare($sql)) {
            $stmt->bind_param("ssi", $autor, $texto, $actividad_id);
            $stmt->execute();
            if ($stmt->affected_rows > 0) {
                error_log('Comentario añadido correctamente');
                $response['success'] = true;
            } else {
                $response['error'] = 'Error al añadir el comentario';
            }
            $stmt->close();
        } else {
            $response['error'] = 'Error en la preparación de la consulta';
        }
        $mysqli->close();
    } else {
        $response['error'] = 'Faltan datos del formulario';
    }

    echo json_encode($response);
    exit();
}

$actividad = getEvento($idEv);
$comentarios = obtenerComentarios($idEv);

echo $twig->render('actividad.html', ['actividad' => $actividad, 'comentarios' => $comentarios]);
?>

