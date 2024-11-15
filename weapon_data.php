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

// Fetch data from the weapons table
$sql = "SELECT * FROM weapons";
$result = $conn->query($sql);

$data = array();
if ($result->num_rows > 0) {
    while($row = $result->fetch_assoc()) {
        $data[] = $row;
    }
}
else {
    echo "No data found in Depositors table";
}

$conn->close();

// Output the data in JSON format
echo json_encode($data);
?>