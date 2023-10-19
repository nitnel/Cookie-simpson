<?php
// Déconnexion de l'utilisateur
session_start();
session_destroy();

// Rediriger vers la page de connexion
header("Location: login.html");
?>
