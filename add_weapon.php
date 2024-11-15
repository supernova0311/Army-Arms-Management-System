<?php
$servername = "localhost";
$username = "root";
$password = "vikrant@18VK";
$dbname = "army";

$conn = new mysqli($servername, $username, $password, $dbname);

// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

$data = json_decode(file_get_contents('php://input'), true);

$weapon_id = $data['Weapon_ID'];
$name = $data['Name'];
$type = $data['Type'];
$caliber = $data['Caliber'];
$manufacturer = $data['Manufacturer'];
$acquisition_date = $data['Acquisition_Date'];
$status = $data['Status'];
$conn->begin_transaction();

$stmt = $conn->prepare("INSERT INTO weapons (Weapon_ID, Name, Type, Caliber, Manufacturer, Acquisition_Date, Status)
VALUES (?, ?, ?, ?, ?, ?, ?)");
$stmt->bind_param("sssssss", $weapon_id, $name, $type, $caliber, $manufacturer, $acquisition_date, $status);

if ($stmt->execute() === TRUE) {
    $conn->commit();
    echo "New record created successfully";
} else {
    $conn->rollback();
    echo "Error: " . $stmt->error;
}

$stmt->close();
$conn->close();
?>