fetch('./assets/texts/items.txt')
  .then(response => response.text())
  .then(text => {
    // Split file into lines, remove empty ones
    const lines = text.split('\n').map(line => line.trim()).filter(Boolean);

    // Find the div with class taglist
    document.querySelectorAll('div.taglist').forEach(div => {
      // Create ul
      const ul = document.createElement('ul');

      // Copy all classes from div to ul
      ul.className = 'bubble-list';

      // Create li elements
      lines.forEach(line => {
        const li = document.createElement('li');
        li.classList.add('bubble-element');
        li.textContent = line;
        ul.appendChild(li);
      });

      // Replace the div with the ul
      div.replaceWith(ul);
    });
  })
  .catch(error => {
    console.error('Error loading text file:', error);
  });