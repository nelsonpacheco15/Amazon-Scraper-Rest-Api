const express = require ('express');
const request = require('request-promise');

const app = express();const PORT = process.env.PORT || 5000;

const generateScraperUrl = (apiKey) => `http://api.scraperapi.com?api_key=${apiKey}&autoparse=true`;

app.use(express.json());
app.get('/', (req, res) => {
    res.send('Welcome to Amazon API');
});

// GET PRODUCT DETAILS

app.get('/products/:productId', async (req, res) => {
    const {productId} = req.params;
    const {api_key} = req.query;

    try {
        const response = await request(`${generateScraperUrl(apiKey)}&url=https://www.amazon.com/dp/${productId}`)
        res.json(response);
    } catch (error) {
        res.json(error);
    }
});



app.listen(PORT, () => console.log(`Server running on port ${PORT}`));