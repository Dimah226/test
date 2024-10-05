let selectedCells = []; // Déclarez le tableau pour stocker les cellules sélectionnées
let clearIntervalId; // Pour stocker l'ID de l'intervalle

function generateGrid(cellSize) {
    const colorDiv = document.querySelector(".color");
 // Taille minimale de la cellule en pixels
    
    // Vider le contenu actuel de la grille
    colorDiv.innerHTML = "";
    
    // Récupérer les dimensions du conteneur .color
    const colorWidth = colorDiv.offsetWidth;
    const colorHeight = colorDiv.offsetHeight;
    
    // Calculer le nombre de colonnes et de lignes
    const cols = Math.floor(colorWidth / cellSize);
    const rows = Math.floor(colorHeight / cellSize);
    
    // Calculer le nombre total de cellules
    const totalCells = cols * rows;

    // Générer les divs de grille
    for (let i = 0; i < totalCells; i++) {
        const div = document.createElement("div");
        div.classList.add("grille");
        
        // Ajouter un gestionnaire d'événements pour le survol
        div.addEventListener("mouseenter", () => {
            const randomColor = `rgb(${Math.floor(Math.random() * 256)}, ${Math.floor(Math.random() * 256)}, ${Math.floor(Math.random() * 256)})`;

            // Vérifiez si la cellule est déjà sélectionnée
            if (!selectedCells.includes(div)) {
                // Si nous avons déjà 6 cellules, effacer la première
                if (selectedCells.length === 6) {
                    clearCell(selectedCells[0]);
                }

                // Changer la couleur de la cellule
                div.style.backgroundColor = randomColor;
                
                // Ajouter la cellule à la liste des cellules sélectionnées
                selectedCells.push(div);

                // Démarrer l'effacement si ce n'est pas déjà en cours
                if (!clearIntervalId) {
                    startClearing();
                }
            }
        });

        colorDiv.appendChild(div);
    }
}

// Fonction pour effacer une cellule
function clearCell(cell) {
    cell.style.backgroundColor = ""; // Réinitialiser la couleur
    // Retirer la cellule de la liste des cellules sélectionnées
    selectedCells.shift();
}

// Fonction pour commencer à effacer progressivement les cellules sélectionnées
function startClearing() {
    clearIntervalId = setInterval(() => {
        if (selectedCells.length > 0) {
            clearCell(selectedCells[0]); // Effacer la première cellule
        } else {
            clearInterval(clearIntervalId); // Arrêter l'intervalle si aucune cellule n'est sélectionnée
            clearIntervalId = null; // Réinitialiser l'ID de l'intervalle
        }
    }, 100); // Délai de 0,1 seconde
}

// Appeler la fonction une première fois pour générer la grille
generateGrid(50);

// Ajouter un écouteur d'événement pour redimensionner la grille quand l'écran change
window.addEventListener("resize", generateGrid(50));


function assombrir() {
    const colorDivs = document.querySelectorAll(".grille");  // Sélectionne tous les éléments avec la classe "color"
    colorDivs.forEach((el) => {
        el.style.backgroundColor = "rgba(0, 0, 0, 0.5)"; 
        el.style.border = "solid rgba(0, 0, 0, 0.25)"; // Applique la couleur d'arrière-plan
    });
}

// Ajoute l'événement "mouseover" à l'élément avec la classe "sombre"
document.querySelector(".sombre").addEventListener("mouseover", assombrir);

function eclaircir() {
    const colorDivs = document.querySelectorAll(".grille");  // Sélectionne tous les éléments avec la classe "color"
    colorDivs.forEach((el) => {
        el.style.backgroundColor = ""; 
        el.style.border="transparent"; // Applique la couleur d'arrière-plan
    });
}

// Ajoute l'événement "mouseover" à l'élément avec la classe "sombre"
document.querySelector("menu").addEventListener("mouseover", eclaircir);

function change() {
    const titre = document.querySelector(".mention");
    const mentions = [" Full-Stack", " Front-End", " Back-End"]; // Liste des mentions
    let index = 0; // Index de la mention actuelle

    setInterval(() => {
        titre.textContent = mentions[index]; // Changer le texte de la mention
        index = (index + 1) % mentions.length; // Incrémenter l'index et revenir à 0 après le dernier élément
    }, 5000); // Délai de 5 secondes
}

change();
const emoji = document.querySelector("#emoji");
function secoue() {
    
    setInterval(() => {
        // Ajouter la classe pour animer l'émoji
        emoji.classList.add("secoue");
        // Retirer la classe après 500ms pour permettre l'animation à se répéter
        setTimeout(() => {
            emoji.classList.remove("secoue");
        }, 500);
    }, 1000); // Délai de 5 secondes
}

secoue();


    const menuBurger = document.querySelector(".menu-burger");
    menuBurger.addEventListener("click", () => {
        document.querySelector("menu").classList.toggle("affiche");
        document.querySelector(".salut").classList.toggle("hide");

    });

