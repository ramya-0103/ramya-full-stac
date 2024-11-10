const express = require('express');
const cors = require('cors');
const axios = require('axios');
require('dotenv').config();

const app = express();
const port = 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Serve client files
app.use(express.static('../client/public'));

// Endpoint to fetch news
app.get('/api/news', async (req, res) => {
    const apiKey = process.env.NEWS_API_KEY;
    const url = `https://newsapi.org/v2/top-headlines?country=us&apiKey=${apiKey}`;

    try {
        const response = await axios.get(url);
        res.json(response.data);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching news', error });
    }
});

// Catch-all route to serve the index.html file for all other requests
app.get('*', (req, res) => {
    res.sendFile('index.html', { root: '../client/public' });
});

// Start the server
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
