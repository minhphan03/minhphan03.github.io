// of course, ChatGPT

document.addEventListener('DOMContentLoaded', function () {
    // Array of div IDs corresponding to text file names
    const divElements = document.querySelectorAll('div[id]'); // Get all div elements with IDs

    divElements.forEach(div => {
        const divId = div.id;

        // Load the text from the corresponding text file.
        fetch(`./assets/music corner/${divId}.txt`) // Assumes text file names match div IDs
            .then(response => response.text())
            .then(text => {
                // Set the loaded text as the inner HTML of the div.
                div.innerHTML = text;
            })
            .catch(error => {
                console.error(`Error loading text for ${divId}:`, error);
            });
    });

});