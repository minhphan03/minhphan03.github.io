document.addEventListener("DOMContentLoaded", function () {
    const gridContainer = document.getElementById("imageGrid");
    const totalImages = 100;

    for (let i = totalImages; i >= 1; i--) {
        let imgElement = document.createElement("img");
        imgElement.src = "images/" + i + ".jpg"; // Alternative if backticks fail
        imgElement.alt = "Image " + i;

        imgElement.onerror = function() { 
            console.error("Failed to load:", imgElement.src);
        };

        gridContainer.appendChild(imgElement);
    };
});
