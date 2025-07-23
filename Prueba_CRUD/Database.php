<?php
$host = 'localhost';
$port = '5432';
$dbname = 'Prueba';
$user = 'postgres';
$password = 'Aaadr3323*'; // tu clave

try {
    $pdo = new PDO("pgsql:host=$host;port=$port;dbname=$dbname", $user, $password);
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
    echo "Conexión exitosa a PostgreSQL";
} catch (PDOException $e) {
    echo "Error de conexión: " . $e->getMessage();
}
?>