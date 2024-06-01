<?php
require_once 'vendor/autoload.php';
session_start();
include("bd.php");
 
$loader = new \Twig\Loader\FilesystemLoader('./templates');
$twig = new \Twig\Environment($loader);

$twig->addGlobal('session', $_SESSION);

error_log('Usuario en sesión: ' . (isset($_SESSION['user']) ? $_SESSION['user'] : 'No hay usuario en la sesión'));

if (isset($_GET['ev'])) {
    $idEv = $_GET['ev'];
  } else {
    $idEv = -1;
  }
   
  $evento = getEvento($idEv);
  $imagenes = obtenerImagenesHastaId(9); // Obtiene imágenes hasta el id 9
 


echo $twig->render('portada.html', ['evento' => $evento, 'imagenes' => $imagenes]);
?>

