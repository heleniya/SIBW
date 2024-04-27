<?php
  require_once '/var/www/html/vendor/autoload.php';
  
  $loader = new \Twig\Loader\FilesystemLoader('./templates');
  $twig = new \Twig\Environment($loader);
  
  echo $twig->render('estructura.html', []);
  ?>
