<?php 
include_once("insertContacto/config.php");
$enviado = false;

if(isset($_POST['enviar'])) {    
	$asunto = $_POST['asunto'];
    $nombre = $_POST['nombre'];
    $email = $_POST['email'];
    $telefono = $_POST['telefono'];
    $servicio = $_POST['servicio'];
    $mensaje = $_POST['mensaje'];
        
    // checking empty fields
    if(empty($nombre) || empty($email) || empty($telefono)
       || empty($servicio) || empty($mensaje)) {
        echo "Al menos debes completar los campos seleccionados en el formulario";
        return 0;
    } else {
        $sql = "INSERT INTO contacto (tipo_solicitud, nombre, email, telefono, comuna, servicio, fecha, hora, mensaje)
                VALUES (?,?,?,?,?,?,?,?,?)";

        if($stmt = mysqli_prepare($link, $sql)){
            // Bind variables to the prepared statement as parameters
            mysqli_stmt_bind_param($stmt, "issssisis", $asunto,$nombre,$email,$telefono,$comuna,$servicio,$fecha,$hora,$mensaje);

            $asunto   = $_REQUEST['asunto'];
            $nombre   = $_REQUEST['nombre'];
            $email    = $_REQUEST['email'];
            $telefono = $_REQUEST['telefono'];
            $comuna   = $_REQUEST['comuna'];
            $servicio = $_REQUEST['servicio'];
            $fecha    = $_REQUEST['fecha'];
            $hora     = $_REQUEST['hora'];
            $mensaje  = $_REQUEST['mensaje'];
            // Attempt to execute the prepared statement
            if($enviado = mysqli_stmt_execute($stmt)){
                //echo "Se han insertado los datos ";
            } else{
                echo "ERROR: Could not execute query: $sql. " . mysqli_error($link);
            }
        } else{
            echo "ERROR: Could not prepare query: $sql. " . mysqli_error($link);
        }
        // Close statement
        mysqli_stmt_close($stmt);
         
        // Close connection
        mysqli_close($link);         
    }
}else{
    echo 'Validar el formulario debes';
    return 0;
}


 

?>