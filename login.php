<?php
$db_host = 'localhost';
$db_username = 'root';
$db_password = 'vikrant@18VK';
$db_name = 'army';

$connection = new mysqli($db_host, $db_username, $db_password, $db_name);

if ($connection->connect_error) {
    die("Connection failed: " . $connection->connect_error);
}

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $userid = $_POST["userid"];
    $password = $_POST["password"];

    $stmt = $connection->prepare("SELECT * FROM user WHERE userid = ? AND password = ?");
    $stmt->bind_param("ss", $userid, $password);
    $stmt->execute();
    $result = $stmt->get_result();

    if ($result->num_rows > 0) {
        header("Location: modules.html");
        exit;
    } else {
        $error_message = "Invalid username or password";
    }
}

$connection->close();
?>

<html>
<head>
    <title>Army Arms Management System</title>
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.3/css/all.min.css">
    <link href="https://fonts.googleapis.com/css2?family=Roboto:wght@400;700&display=swap" rel="stylesheet">
    <link rel="stylesheet" href="styles.css">
    <script src="./script.js"></script>
</head>
<body>
    <div class="Heading">
        <h1>
            <center> Army Arms Management System </center>
        </h1>
    </div>
    <div class="login_container">
        
        <form class="login-form" action="login.php" method="post">
            <label for="username"><i class="fas fa-user icon"></i>UserI'd</label>
            <input type="textfield" id="userid" name="userid" required>
            <label for="password"><i class="fas fa-lock icon"></i>Password</label>
            <input type="password" id="password" name="password" required>
            </form>
            <?php if (isset($error_message)) { ?>
            <div class="error-message-container">
                <div class="error-message">
                    <?php echo $error_message; ?>
                </div>
            </div>
        <?php } ?>
            </div>
</body>
</html>