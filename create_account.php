<?php
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $username = $_POST["username"];
    $password = $_POST["password"]; 
    
    // Connexion à la base de données
    $conn = new mysqli("localhost", "root", "root", "my_users_database");

    if ($conn->connect_error) {
        die("Échec de la connexion à la base de données : " . $conn->connect_error);
    }

    // Vérification si le nom d'utilisateur est déjà utilisé
    $checkUserQuery = "SELECT * FROM users WHERE username = '$username'";
    $result = $conn->query($checkUserQuery);

    if ($result->num_rows > 0) {
        echo "Ce nom d'utilisateur est déjà utilisé. Veuillez en choisir un autre.";
    } else {
        // Ajout de l'utilisateur à la base de données
        $addUserQuery = "INSERT INTO users (username, password) VALUES ('$username', '$password')";
        if ($conn->query($addUserQuery) === TRUE) {
            echo "Compte créé avec succès.";
        } else {
            echo "Erreur : " . $conn->error;
        }
    }

    $conn->close();
}
?>
