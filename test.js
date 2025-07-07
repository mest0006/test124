async function decodeSecretMessage(url) {
    try {
      // Fetch the data from the URL (assuming it's a CSV format)
      const response = await fetch(url);
      
      if (!response.ok) {
        console.error('Failed to retrieve the document.');
        return;
      }
      
      // Parse the CSV data from the response
      const text = await response.text();
      const lines = text.split('\n');
      
      // Dictionary to store characters at their respective (x, y) coordinates
      const grid = {};
  
      // Process each line from the document (x, y, character)
      lines.forEach(line => {
        const [x, y, char] = line.split(',');
        if (x && y && char) {
          grid[`${x},${y}`] = char; // Using a key as 'x,y' to store the character
        }
      });
      
      // Find the max x and y to determine the size of the grid
      let maxX = 0;
      let maxY = 0;
      for (let key in grid) {
        const [x, y] = key.split(',').map(Number);
        maxX = Math.max(maxX, x);
        maxY = Math.max(maxY, y);
      }
      
      // Construct and print the grid row by row
      for (let y = 0; y <= maxY; y++) {
        let row = '';
        for (let x = 0; x <= maxX; x++) {
          // If the coordinate exists, use that character; otherwise, use a space
          row += grid[`${x},${y}`] || ' ';
        }
        console.log(row);
      }
      
    } catch (error) {
      console.error('Error fetching or processing the document:', error);
    }
  }
  
  // Example usage (replace with the actual URL of the Google Doc or data):

  decodeSecretMessage("https://docs.google.com/document/d/e/2PACX-1vTER-wL5E8YC9pxDx43gk8eIds59GtUUk4nJo_ZWagbnrH0NFvMXIw6VWFLpf5tWTZIT9P9oLIoFJ6A/pub");
