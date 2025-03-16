const container = document.querySelector(".container");
container.style.display = "flex";
container.style.flexWrap = "wrap";
container.style.width = "1000px";
container.style.height = "960px";
container.style.margin = "50px 450px";
container.style.border = "1px solid #ccc";

function createGrid(rows, cols) {
    container.innerHTML = ''; // Clear existing grid
    for (let i = 0; i < rows * cols; i++) {
        const gridItem = document.createElement("div");
        gridItem.classList.add("cell");
        gridItem.dataset.opacity = 0; // Initialize opacity level
        gridItem.dataset.color = getRandomColor(); // Initialize random color

        // Add hover effect using JavaScript
        gridItem.addEventListener("mouseover", () => {
            // gridItem.style.backgroundColor = getRandomColor(); // Change to desired hover color
            let opacity = parseFloat(gridItem.dataset.opacity);
            if (opacity < 1) {
                opacity += 0.1;
                gridItem.dataset.opacity = opacity;
                gridItem.style.backgroundColor = gridItem.dataset.color;
                gridItem.style.opacity = opacity;
            }
        });
        gridItem.addEventListener("mouseout", () => {
            gridItem.style.backgroundColor = ""; // Reset to original color
        });
        gridItem.style.width = `${960 / cols}px`;
        gridItem.style.height = `${960 / rows}px`;
        // gridItem.style.border = "1px solid #ccc";
        container.appendChild(gridItem);
    }
}

function getRandomColor() {
    const letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}

createGrid(16, 16);

const modifyGridBtn = document.querySelector(".modifyGridBtn");
modifyGridBtn.addEventListener("click", () => {
    let rows, cols;

    do {
        rows = parseInt(prompt("Enter number of rows (less than 100)"));
        cols = parseInt(prompt("Enter number of columns (less than 100)"));
        if (rows >= 100 || cols >= 100) {
            alert("Please enter a number less than 100 for both rows and columns.");
        }
    } while (rows >= 100 || cols >= 100);
    
    if (rows && cols) {
        const cells = container.querySelectorAll(".cell");
        const totalCells = rows * cols;

        // Adjust the number of cells
        if (cells.length > totalCells) {
            for (let i = cells.length - 1; i >= totalCells; i--) {
                container.removeChild(cells[i]);
            }
        } else if (cells.length < totalCells) {
            for (let i = cells.length; i < totalCells; i++) {
                const gridItem = document.createElement("div");
                gridItem.classList.add("cell");
                gridItem.dataset.opacity = 0; // Initialize opacity level
                gridItem.dataset.color = getRandomColor(); // Initialize random color

                // Add hover effect using JavaScript
                gridItem.addEventListener("mouseover", () => {
                    let opacity = parseFloat(gridItem.dataset.opacity);
                    if (opacity < 1) {
                        opacity += 0.1;
                        gridItem.dataset.opacity = opacity;
                        gridItem.style.backgroundColor = gridItem.dataset.color;
                        gridItem.style.opacity = opacity;
                    }
                });
                gridItem.addEventListener("mouseout", () => {
                    gridItem.style.backgroundColor = ""; // Reset to original color
                });
                container.appendChild(gridItem);
            }
        }

        // Update the dimensions of all cells
        container.querySelectorAll(".cell").forEach(cell => {
            cell.style.width = `${960 / cols}px`;
            cell.style.height = `${960 / rows}px`;
            // cell.style.border = "1px solid #ccc";
        });
    }
});