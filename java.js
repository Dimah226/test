let selectedCells = []; // Array to store selected cells
let clearIntervalId; // To store the interval ID

// Function to generate the grid
function generateGrid(cellSize) {
    const colorDiv = document.querySelector(".color");
    colorDiv.innerHTML = ""; // Clear current grid

    // Get dimensions of the container
    const colorWidth = colorDiv.offsetWidth;
    const colorHeight = colorDiv.offsetHeight;

    // Calculate number of columns and rows
    const cols = Math.floor(colorWidth / cellSize);
    const rows = Math.floor(colorHeight / cellSize);
    const totalCells = cols * rows; // Total cells

    // Create grid cells
    for (let i = 0; i < totalCells; i++) {
        const div = document.createElement("div");
        div.classList.add("grille");

        // Add mouse enter event to change color
        div.addEventListener("mouseenter", () => changeCellColor(div));

        // Add touch events for mobile
        div.addEventListener("touchstart", (e) => {
            e.preventDefault(); // Prevent default touch behavior
            changeCellColor(div);
        });

        // Use touchmove on the container to follow finger
        colorDiv.addEventListener("touchmove", (e) => {
            e.preventDefault(); // Prevent scrolling
            const touch = e.touches[0]; // Get the first touch point
            const targetDiv = document.elementFromPoint(touch.clientX, touch.clientY); // Get the element under the touch point
            if (targetDiv && targetDiv.classList.contains("grille")) {
                changeCellColor(targetDiv); // Change the color of the target cell
            }
        });

        colorDiv.appendChild(div);
    }
}

// Function to change cell color
function changeCellColor(cell) {
    const randomColor = `rgb(${Math.floor(Math.random() * 256)}, ${Math.floor(Math.random() * 256)}, ${Math.floor(Math.random() * 256)})`;

    if (!selectedCells.includes(cell)) {
        if (selectedCells.length === 6) {
            clearCell(selectedCells[0]);
        }

        cell.style.backgroundColor = randomColor;
        selectedCells.push(cell);

        if (!clearIntervalId) {
            startClearing();
        }
    }
}

// Function to clear a cell
function clearCell(cell) {
    cell.style.backgroundColor = ""; // Reset color
    selectedCells.shift(); // Remove from selectedCells
}

// Function to start clearing cells
function startClearing() {
    clearIntervalId = setInterval(() => {
        if (selectedCells.length > 0) {
            clearCell(selectedCells[0]); // Clear the first cell
        } else {
            clearInterval(clearIntervalId); // Stop clearing
            clearIntervalId = null; // Reset the ID
        }
    }, 100); // Adjust timing as needed
}

// Call function to generate the grid
generateGrid(50);

// Debounced resize event handler
let resizeTimeout;
window.addEventListener("resize", () => {
    clearTimeout(resizeTimeout);
    resizeTimeout = setTimeout(() => {
        generateGrid(50); // Regenerate grid on resize
    }, 100);
});

// Function to darken grid cells
function assombrir() {
    const colorDivs = document.querySelectorAll(".grille");
    colorDivs.forEach((el) => {
        el.style.backgroundColor = "rgba(0, 0, 0, 0.5)";
        el.style.border = "solid rgba(0, 0, 0, 0.25)";
    });
}

// Event to darken cells on hover over "sombre"
document.querySelector(".sombre").addEventListener("mouseover", assombrir);

// Function to lighten grid cells
function eclaircir() {
    const colorDivs = document.querySelectorAll(".grille");
    colorDivs.forEach((el) => {
        el.style.backgroundColor = "";
        el.style.border = "transparent";
    });
}

// Event to lighten cells on hover over "menu"
document.querySelector("menu").addEventListener("mouseover", eclaircir);

// Function to change text in title
function changeTitle() {
    const titre = document.querySelector(".mention");
    const mentions = [" Full-Stack", " Front-End", " Back-End"];
    let index = 0;

    setInterval(() => {
        titre.textContent = mentions[index];
        index = (index + 1) % mentions.length;
    }, 5000); // Change text every 5 seconds
}

// Call to change title
changeTitle();

// Function to shake emoji
const emoji = document.querySelector("#emoji");
function shakeEmoji() {
    setInterval(() => {
        emoji.classList.add("secoue");
        setTimeout(() => {
            emoji.classList.remove("secoue");
        }, 500);
    }, 1000); // Shake every second
}

// Call to shake emoji
shakeEmoji();

// Menu burger toggle
const menuBurger = document.querySelector(".menu-burger");
menuBurger.addEventListener("click", () => {
    document.querySelector("menu").classList.toggle("affiche");
    document.querySelector(".salut").classList.toggle("hide");
    eclaircir(); // Lighten grid cells when menu is opened
});

// Initialize the grid on first load
generateGrid(50);
