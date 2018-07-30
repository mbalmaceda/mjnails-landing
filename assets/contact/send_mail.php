<?php
require 'PHPMailer/PHPMailerAutoload.php';
require 'PHPMailer/extras/Security.php';

include_once('createContacto.php');

define('SMTP_HOST', 'starbuck.asoshared.com'); // Hostname of the mail server
define('SMTP_USERNAME', 'no-reply@mjnails.cl'); // Username for SMTP authentication any valid email created in your domain
define('SMTP_PASSWORD', 'Mirko123.'); // Password for SMTP authentication
define('SMTP_PORT', 465); // Port of the SMTP like to be 25, 80, 465 or 587

// To address who will receive this email
$to = 'mariajesus@mjnails.cl';

$security = new Security();
// This IF condition is for improving security and Prevent Direct Access to the Mail Script.
if ($enviado)
{
    // Collect POST data from form
    $asunto   = $security->xss_clean($_POST['asunto']);
    $nombre   = $security->xss_clean($_POST['nombre']);
    $email    = $security->xss_clean($_POST['email']);
    $telefono = $security->xss_clean($_POST['telefono']);
    $comuna   = $security->xss_clean($_POST['comuna']);
    $servicio = $security->xss_clean($_POST['servicio']);
    $fecha    = $security->xss_clean($_POST['fecha']);
    $hora     = $security->xss_clean($_POST['hora']);
    $mensaje  = $security->xss_clean($_POST['mensaje']);

    $servicioNombre = "";
    $horaNombre = "";
    $asuntoNombre = "";

    // Prefedined Variables
    $set_from = 'Contacto desde Sitio Web';
    $subject = 'Contacto desde Sitio Web: Mensaje de ' . $nombre . '!';

    if ($servicio == "1") {
        $servicioNombre = "Esmaltado permanente"; 
    } elseif($servicio == "2") {
        $servicioNombre = "Uñas Acrílicas"; 
    } elseif($servicio == "3") {
        $servicioNombre = "Relleno Acrílicas + Esmaltado permanente"; 
    } elseif($servicio == "4") {
        $servicioNombre = "Retiro Esmaltado permanente"; 
    } elseif($servicio == "5") {
        $servicioNombre = "Retiro Uñas acrílicas"; 
    }

    if ($hora == "1") {
        $horaNombre = "11:00 AM"; 
    } elseif($hora == "2") {
        $horaNombre = "14:30 PM"; 
    } elseif($hora == "3") {
        $horaNombre = "16:00 PM"; 
    } elseif($hora == "4") {
        $horaNombre = "17:30 PM"; 
    } elseif($hora == "5") {
        $horaNombre = "19:00 PM"; 
    }

    if ($asunto == "1") {
        $asuntoNombre ="Agendar Hora";
    } elseif($asunto == "2") {
        $asuntoNombre ="Consulta";
    }
    

    // Collecting all content in HTML Table
    $content = '<table width="100%">
    <tr><td colspan="2"><strong>Detalles de Contacto:</strong></td></tr>
    <tr><td valign="top">Tipo de Contacto:</td><td>' . $asuntoNombre . '</td></tr>
    <tr><td valign="top">Nombre:</td><td>' . $nombre . '</td></tr>
    <tr><td valign="top">Email:</td><td>' . $email . '</td></tr>
    <tr><td valign="top">Telefono:</td><td>' . $telefono . '</td></tr>
    <tr><td valign="top">Comuna:</td><td>' . $comuna . '</td></tr>
    <tr><td valign="top">Servicio:</td><td>' . $servicioNombre . '</td></tr>
    <tr><td valign="top">Fecha:</td><td>' . $fecha . '</td></tr>
    <tr><td valign="top">Hora:</td><td>' . $horaNombre . '</td></tr>
    <tr><td valign="top">Mensaje:</td><td>' . $mensaje . '</td></tr>
    </table> ';

    try {
        $mail = new PHPMailer();
        $mail->isSMTP();
        $mail->CharSet = 'UTF-8';
        $mail->Host = SMTP_HOST;
        $mail->Port = SMTP_PORT;
        $mail->SMTPSecure = 'ssl';
        $mail->SMTPAuth = true;
        $mail->Username = SMTP_USERNAME;
        $mail->Password = SMTP_PASSWORD;

        $mail->setFrom(SMTP_USERNAME, $set_from);
        $mail->addAddress($to);

        $mail->Subject = $subject;
        $mail->msgHTML($content);
        // Send the message
        $result = false;
        if ($mail->send()) {
            $result = true;
        }
        echo json_decode($result);
    } catch (phpmailerException $e) {
        echo $e->errorMessage(); //Pretty error messages from PHPMailer
    } catch (Exception $e) {
        echo $e->getMessage(); //Boring error messages from anything else!
    }
}