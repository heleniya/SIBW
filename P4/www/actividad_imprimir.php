<?php
require_once 'vendor/autoload.php';
include("bd.php");
 
$loader = new \Twig\Loader\FilesystemLoader('./templates');
$twig = new \Twig\Environment($loader);

if (isset($_GET['ev'])) {
    $idEv = $_GET['ev'];
  } else {
    $idEv = -1;
  }
   
  $actividad = getEvento($idEv);

echo $twig->render('actividad_imprimir.html', ['actividad' => $actividad]);
?>

