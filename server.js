const express = require('express');

const app = express();
const PORT = 3000;

app.use(express.static('.'));

app.get('/api/restaurants', async (req, res) => {
  try {
    const response = await fetch(
      'https://media2.edu.metropolia.fi/restaurant/api/v1/restaurants'
    );

    if (!response.ok) {
      throw new Error('Failed to fetch restaurants');
    }

    const data = await response.json();

    res.json(data);
  } catch (error) {
    console.error(error);

    res.status(500).json({
      error: 'Could not load restaurants'
    });
  }
});

app.listen(PORT, () => {
  console.log(`Server running: http://localhost:${PORT}`);
});