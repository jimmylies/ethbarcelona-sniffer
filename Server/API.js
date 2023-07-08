const express = require('express');
const fs = require('fs');
const app = express();
app.use(express.json());

const dataPath = './wish.json';

app.post('/add-NFT-wish', (req, res) => {
    const { userAddress, contractAddress, rarity, priceThreshold } = req.body;

    if (!userAddress || !contractAddress || !rarity || !priceThreshold) {
        return res.status(400).send('Missing required parameters.');
    }

    // Load existing data
    let data;
    try {
        data = JSON.parse(fs.readFileSync(dataPath, 'utf8'));
    } catch (err) {
        // If file does not exist, start with an empty array
        data = [];
    }

    // Append new NFT wish
    const wish = { userAddress, contractAddress, rarity, priceThreshold };
    data.push(wish);

    // Save data
    fs.writeFileSync(dataPath, JSON.stringify(data, null, 2), 'utf8');

    res.send(wish);
});

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}...`));
