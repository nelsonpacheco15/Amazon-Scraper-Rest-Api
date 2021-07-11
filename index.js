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
        res.json(JSON.parse(response));
    } catch (error) {
        res.json(error);
    }
});


// GET PRODUCT REVIEWS

app.get('/products/:productId/reviews', async (req, res) => {
    const {productId} = req.params;
    const {api_key} = req.query;

    try {
        const response = await request(`${generateScraperUrl(apiKey)}&url=https://www.amazon.com/product-reviews/${productId}`)
        res.json(JSON.parse(response));
    } catch (error) {
        res.json(error);
    }
});

// GET MORE PRODUCT OFFERS

app.get('/products/:productId/offers', async (req, res) => {
    const {productId} = req.params;
    const {api_key} = req.query;

    try {
        const response = await request(`${generateScraperUrl(apiKey)}&url=https://www.amazon.com/gp/offer-listing/${productId}`)
        res.json(JSON.parse(response));
    } catch (error) {
        res.json(error);
    }
});


// search query
app.get('/search/:searchquery', async (req, res) => {
    const {searchquery} = req.params;
    const {api_key} = req.query;

    try {
        const response = await request(`${generateScraperUrl(apiKey)}&url=https://www.amazon.com/s?k=${searchquery}`)
        res.json(JSON.parse(response));
    } catch (error) {
        res.json(error);
    }
});






app.listen(PORT, () => console.log(`Server running on port ${PORT}`));