<?php

// Importing DBConfig.php file.
include 'DBConfig.php';

// Creating connection.
 $con = mysqli_connect($HostName,$HostUser,$HostPass,$DatabaseName);

 // Getting the received JSON into $json variable.
 $json = file_get_contents('php://input');
 
 // decoding the received JSON and store into $obj variable.
 $obj = json_decode($json,true);

 // Populate name from JSON $obj array and store into $name.
$nombre_completo = $obj['nombre_completo'];

// Populate email from JSON $obj array and store into $email.
$id_usuario = $obj['id_usuario'];
 
 // Creating SQL query and insert the record into MySQL database table.
$Sql_Query = "insert into usuarios (nombre_completo,bio,fecha_nacimiento, Pais, Email, puntos, fecha_creacion, fecha_modificacion) values ('juan', 'soy juan','23-03-2020', 'España', 'juan@juan.com', '0', '23-03-2020', '')";
 

 if(mysqli_query($con,$Sql_Query)){
$MSG = 'Data Inserted Successfully into MySQL Database' ;
$json = json_encode($MSG);

// Echo the message.
 echo $json ;
 
 }
 else{
    $MSG = 'No' ;
    $json = json_encode($MSG);
 
 }
 mysqli_close($con);
?>