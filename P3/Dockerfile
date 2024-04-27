FROM php:7.4-apache

# Instalar las dependencias necesarias para Composer
RUN apt-get update && apt-get install -y git unzip

# Instalar Composer
RUN php -r "copy('https://getcomposer.org/installer', 'composer-setup.php');"
RUN php -r "if (hash_file('sha384', 'composer-setup.php') === 'dac665fdc30fdd8ec78b38b9800061b4150413ff2e3b6f88543c636f7cd84f6db9189d43a81e5503cda447da73c7e5b6') { echo 'Installer verified'; } else { echo 'Installer corrupt'; unlink('composer-setup.php'); } echo PHP_EOL;"
RUN php composer-setup.php
RUN php -r "unlink('composer-setup.php');"
RUN mv composer.phar /usr/local/bin/composer

# Instalar Twig con Composer
RUN composer require "twig/twig:^3.0"

# Configurar el nombre del servidor para evitar el mensaje de FQDN
RUN echo 'ServerName localhost' >> /etc/apache2/apache2.conf

# Configuración de permisos y copiado de archivos
RUN chown -R www-data:www-data /var/www/html
RUN chmod -R 755 /var/www/html
COPY . /var/www/html

EXPOSE 80

# Instalar dependencias con Composer
RUN composer install

