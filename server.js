const express = require('express');
const fs = require('fs');
const path = require('path');
const crypto = require('crypto');

const app = express();
const PORT = 3000;

app.use(express.static('public'));
app.use(express.json());

const generateApiKey = () => {
    return crypto.randomBytes(16).toString('hex'); // Generates a random 32-character hex string
};

app.post('/generate-key', (req, res) => {
    const key = generateApiKey();
    
    // Example: Add the key to a specific database file
    const dbPath = path.join(__dirname, 'database', 'db1.json');
    
    fs.readFile(dbPath, 'utf-8', (err, data) => {
        if (err) {
            return res.status(500).json({ error: 'Error reading the database file' });
        }
        
        const db = JSON.parse(data);
        db.keys.push(key);

        fs.writeFile(dbPath, JSON.stringify(db, null, 2), 'utf-8', (err) => {
            if (err) {
                return res.status(500).json({ error: 'Error writing to the database file' });
            }
            res.json({ key });
        });
    });
});

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
