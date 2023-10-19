<?php
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    if (isset($_POST["delete"])) {
        // Suppression du compte

        // Connexion à la base de données
        $conn = new mysqli("localhost", "root", "root", "my_users_database");

        if ($conn->connect_error) {
            die("Échec de la connexion à la base de données : " . $conn->connect_error);
        }

        $userID = $_SESSION['user_id']; 
        $deleteQuery = "DELETE FROM users WHERE id = $userID";

        if ($conn->query($deleteQuery) === TRUE) {
            // Déconnexion de l'utilisateur après la suppression
            session_start();
            session_destroy();

            echo "Votre compte a été supprimé avec succès.";
        } else {
            echo "Erreur : " . $conn->error;
        }

        $conn->close();
    } elseif (isset($_POST["cancel"])) {
        // L'utilisateur a annulé la suppression
        header("Location: modify_account.html"); 
    }
}
?>
