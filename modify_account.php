<?php
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $username = $_POST["username"];
    $newPassword = $_POST["new_password"]; 
    
    // Connexion à la base de données
    $conn = new mysqli("localhost", "root", "root", "my_users_database");

    if ($conn->connect_error) {
        die("Échec de la connexion à la base de données : " . $conn->connect_error);
    }

    // Mettre à jour les informations de l'utilisateur
    $userID = $_SESSION['user_id']; // Vous devez avoir une session pour connaître l'utilisateur actuel
    $updateQuery = "UPDATE users SET username = '$username'";

    // Mettre à jour le mot de passe si un nouveau mot de passe est fourni
    if (!empty($newPassword)) {
        $updateQuery .= ", password = '$newPassword'"; // Assurez-vous de hacher le nouveau mot de passe
    }

    $updateQuery .= " WHERE id = $userID";

    if ($conn->query($updateQuery) === TRUE) {
        echo "Compte modifié avec succès.";
    } else {
        echo "Erreur : " . $conn->error;
    }

    $conn->close();
}
?>

