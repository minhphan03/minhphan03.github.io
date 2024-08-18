// of course, ChatGPT


document.addEventListener('DOMContentLoaded', async function () {
    // Array of p IDs corresponding to text file names
    const pElements = document.querySelectorAll('p[id]'); // Get all p elements with IDs

    for (const p of pElements) {
        const pId = p.id;

        try {
            // Load the text from the corresponding text file.
            const response = await fetch(`./assets/texts/${pId}.txt`); // Assumes text file names match p IDs
            
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }

            const text = await response.text();
            // Set the loaded text as the text content of the p.
            p.textContent = text;
        } catch (error) {
            console.error(`Error loading text for ${pId}:`, error);
            // Optionally, you can set a fallback message in case of error
            p.textContent = 'Failed to load content.';
        }
    }
});