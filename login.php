<?php
// Vérification de l'envoi du formulaire
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $username = $_POST["username"];
    $password = $_POST["password"];

    // Connexion à la base de données MySQL
    $conn = new mysqli("localhost", "nom_utilisateur_db", "mot_de_passe_db", "nom_de_la_base_de_données");

    if ($conn->connect_error) {
        die("Échec de la connexion à la base de données : " . $conn->connect_error);
    }

    // Vérification des informations de connexion
    $sql = "SELECT * FROM utilisateurs WHERE username = '$username' AND password = '$password'";
    $result = $conn->query($sql);

    if ($result->num_rows > 0) {
        // L'utilisateur est authentifié, redirigez-le vers la page principale
        header("Location: page_principale.php");
    } else {
        echo "Nom d'utilisateur ou mot de passe incorrect.";
    }

    $conn->close();
}
?>
