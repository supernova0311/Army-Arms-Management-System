<?php
// store-weapon-data.php

// Connect to database
$conn = mysqli_connect("localhost", "username", "password", "database");

// Check connection
if (!$conn) {
  die("Connection failed: " . mysqli_connect_error());
}

// Store data in database
if ($_SERVER["REQUEST_METHOD"] == "POST") {
  $weaponId = $_POST["weaponId"];
  $name = $_POST["name"];
  $type = $_POST["type"];
  $caliber = $_POST["caliber"];
  $manufacturer = $_POST["manufacturer"];
  $acquisitionDate = $_POST["acquisitionDate"];
  $status = $_POST["status"];

  $sql = "INSERT INTO weapons (weaponId, name, type, caliber, manufacturer, acquisitionDate, status) VALUES ('$weaponId', '$name', '$type', '$caliber', '$manufacturer', '$acquisitionDate', '$status')";
  mysqli_query($conn, $sql);
}

// Retrieve data from database
if ($_SERVER["REQUEST_METHOD"] == "GET") {
  $sql = "SELECT * FROM weapons";
  $result = mysqli_query($conn, $sql);
  $data = array();
  while ($row = mysqli_fetch_assoc($result)) {
    $data[] = $row;
  }
  echo json_encode($data);
}

mysqli_close($conn);