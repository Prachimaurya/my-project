<?php
include 'config.php';

if ($_SERVER['REQUEST_METHOD'] == 'POST') {
    $patientName = $_POST['patientName'];
    $service = $_POST['service'];
    $amount = $_POST['amount'];

    $sql = "INSERT INTO patients (name, service, amount) VALUES (?, ?, ?)";
    $stmt = $conn->prepare($sql);
    $stmt->bind_param("ssd", $patientName, $service, $amount);

    if ($stmt->execute()) {
        echo "Billing information submitted successfully!";
    } else {
        echo "Error: " . $stmt->error;
    }
}
?>
