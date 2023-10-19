const fs = require('fs');

const newUser = {
  id: 3,
  username: 'utilisateur3',
  email: 'utilisateur3@example.com'
};

// Charger les données existantes depuis le fichier JSON
fs.readFile('data.json', 'utf8', (err, data) => {
  if (err) {
    console.error("Erreur de lecture du fichier JSON :", err);
    return;
  }

  let jsonData = JSON.parse(data);

  // Ajouter un nouvel utilisateur
  jsonData.users.push(newUser);

  // Enregistrer les données mises à jour dans le fichier JSON
  fs.writeFile('data.json', JSON.stringify(jsonData, null, 2), 'utf8', (err) => {
    if (err) {
      console.error("Erreur d'écriture dans le fichier JSON :", err);
      return;
    }

    console.log("Nouvel utilisateur ajouté avec succès !");
  });
});
const fs = require('fs');

// Lire les données depuis le fichier JSON
fs.readFile('data.json', 'utf8', (err, data) => {
  if (err) {
    console.error("Erreur de lecture du fichier JSON :", err);
    return;
  }
  try {
    const jsonData = JSON.parse(data);

    // Accéder aux utilisateurs
    const users = jsonData.users;
    console.log(users);
  } catch (parseError) {
    console.error("Erreur d'analyse du JSON :", parseError);
  }
});

