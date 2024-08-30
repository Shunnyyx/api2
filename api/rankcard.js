const express = require('express');
const { createCanvas, loadImage } = require('canvas');
const path = require('path');

const app = express();

app.get('/api/rankcard', async (req, res) => {
    const username = req.query.username || 'User';
    const level = req.query.level || 1;
    const exp = req.query.exp || 0;
    const nextLevelExp = req.query.nextLevelExp || 1000;
    const avatarUrl = req.query.avatar || 'https://cdn.aiko.top/default-avatar.png';

    const width = 700;
    const height = 250;
    const canvas = createCanvas(width, height);
    const ctx = canvas.getContext('2d');

    // Background color
    ctx.fillStyle = '#2c3e50';
    ctx.fillRect(0, 0, width, height);

    // Load and draw avatar
    const avatar = await loadImage(avatarUrl);
    ctx.drawImage(avatar, 30, 30, 190, 190);

    // Username
    ctx.fillStyle = '#ffffff';
    ctx.font = 'bold 40px Poppins';
    ctx.fillText(username, 250, 80);

    // Level and Experience
    ctx.font = '30px Poppins';
    ctx.fillText(`Level: ${level}`, 250, 130);
    ctx.fillText(`XP: ${exp} / ${nextLevelExp}`, 250, 180);

    // Draw progress bar
    const progressBarWidth = 400;
    const progress = (exp / nextLevelExp) * progressBarWidth;

    ctx.fillStyle = '#9c88ff';
    ctx.fillRect(250, 200, progress, 25);

    ctx.strokeStyle = '#ffffff';
    ctx.lineWidth = 2;
    ctx.strokeRect(250, 200, progressBarWidth, 25);

    // Convert to image and send
    const buffer = canvas.toBuffer('image/png');
    res.set('Content-Type', 'image/png');
    res.send(buffer);
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
