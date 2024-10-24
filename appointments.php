<?php
include 'config.php';

if ($_SERVER['REQUEST_METHOD'] == 'POST') {
    $patientName = $_POST['patientName'];
    $doctorName = $_POST['doctorName'];
    $date = $_POST['date'];
    $time = $_POST['time'];

    $sql = "INSERT INTO appointments (patient_name, doctor_name, date, time) VALUES (?, ?, ?, ?)";
    $stmt = $conn->prepare($sql);
    $stmt->bind_param("ssss", $patientName, $doctorName, $date, $time);

    if ($stmt->execute()) {
        echo "Appointment scheduled successfully!";
    } else {
        echo "Error: " . $stmt->error;
    }
}
?>
