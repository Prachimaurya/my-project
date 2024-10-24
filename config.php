<?php
$host = "localhost";
$dbname = "hospital_management";
$username = "root";
$password = "12345";

$conn = new mysqli($host, $username, $password, $dbname);

if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}
?>
