<?php
$link = mysqli_connect("localhost", "mjnailsc_mirko", "Mirko123.", "mjnailsc_ddbb");

if($link === false){
    die("ERROR: Could not connect. " . mysqli_connect_error());
}
?>