// Récupérer les éléments HTML nécessaires
const bouton = document.getElementById("monBouton");
const display = document.getElementById("display");
const multiplierBtn = document.getElementById("multiplier");
const autoclicBtn = document.getElementById("autoclic");
const bonusBtn = document.getElementById("bonus");

// Initialisation des variables
let score = 0;
let multiplicateur = 1;
let multiplicateurCost = 50;
let autoclickerActive = false;
let autoclickerCost = 500;
let bonusActive = false;
let bonusCost = 5000;
let bonusDuration = 30;
let bonusTimer = null;
let clicksRequiredForMultiplier = 10; // Nombre de clics requis pour activer les multiplicateurs
let clicksRequiredForAutoclicker = 20; // Nombre de clics requis pour activer le clic automatique
let clicksRequiredForBonus = 30; // Nombre de clics requis pour activer le bonus

// Écouteur d'événement pour le clic sur le bouton principal
bouton.addEventListener("click", () => {
    if (bonusActive) {
        score += 3; // Augmente le score de 3 pendant le bonus
    } else {
        score += multiplicateur; // Augmente le score en fonction du multiplicateur
    }
    display.textContent = score;
    
    // Vérification si les améliorations doivent être activées
    if (score >= clicksRequiredForMultiplier && !multiplierBtn.disabled) {
        multiplierBtn.disabled = false; // Active le bouton des multiplicateurs
    }
    if (score >= clicksRequiredForAutoclicker && !autoclicBtn.disabled) {
        autoclicBtn.disabled = false; // Active le bouton du clic automatique
    }
    if (score >= clicksRequiredForBonus && !bonusBtn.disabled) {
        bonusBtn.disabled = false; // Active le bouton du bonus
    }
});

// Fonction pour augmenter le multiplicateur
function augmenterMultiplicateur() {
    if (score >= multiplicateurCost) {
        score -= multiplicateurCost;
        multiplicateur++;
        multiplicateurCost = Math.pow(2, multiplicateur) * 50;
        display.textContent = score;
        updateMultiplierButton();
    }
}

// Met à jour le texte du bouton des multiplicateurs
function updateMultiplierButton() {
    multiplierBtn.textContent = `Multiplier x${multiplicateur} (Coût : ${multiplicateurCost})`;
}

// Fonction pour activer le clic automatique
function startAutoclick() {
    if (score >= autoclickerCost && !autoclickerActive) {
        autoclickerActive = true;
        autoclicBtn.disabled = true; // Désactive le bouton d'achat du clic automatique
        setInterval(() => {
            bouton.click(); // Simule un clic sur le bouton principal
        }, 1000); // Déclenche le clic automatique toutes les secondes
    }
}

// Fonction pour acheter le clic automatique
function buyAutoclicker() {
    if (score >= autoclickerCost) {
        score -= autoclickerCost;
        autoclickerCost = 0; // Le coût du clic automatique devient 0 une fois acheté
        updateAutoclicButton();
        startAutoclick();
    }
}

// Met à jour le texte du bouton du clic automatique
function updateAutoclicButton() {
    autoclicBtn.textContent = `Acheter Autoclic (Coût : ${autoclickerCost})`;
}

// Fonction pour activer le bonus
function startBonus() {
    if (score >= bonusCost && !bonusActive) {
        bonusActive = true;
        bonusBtn.textContent = `Bonus (${bonusDuration}s)`; // Affiche le temps restant du bonus dans le bouton
        bonusBtn.disabled = true; // Désactive le bouton d'achat du bonus
        bonusTimer = setTimeout(() => {
            bonusActive = false;
            bonusBtn.textContent = `Acheter Bonus (Coût : ${bonusCost})`;
            bonusBtn.disabled = false; // Réactive le bouton d'achat du bonus après l'expiration du bonus
        }, bonusDuration * 1000); // Le bonus dure pendant bonusDuration secondes
    }
}

// Fonction pour mettre à jour l'état des boutons
function updateButtonsState() {
    // Désactive les boutons si le score est insuffisant ou si l'amélioration est déjà active
    multiplierBtn.disabled = score < clicksRequiredForMultiplier || multiplicateurCost > score;
    autoclicBtn.disabled = score < clicksRequiredForAutoclicker || autoclickerCost > score || autoclickerActive;
    bonusBtn.disabled = score < clicksRequiredForBonus || bonusCost > score || bonusActive;
}

// Écouteurs d'événements pour les boutons
multiplierBtn.addEventListener("click", augmenterMultiplicateur);
bonusBtn.addEventListener("click", startBonus);

// Met à jour l'état des boutons au chargement de la page
updateMultiplierButton();
updateAutoclicButton();
updateButtonsState();