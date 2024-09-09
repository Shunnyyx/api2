const express = require('express');
const app = express();
const port = 3000;

// Middleware para parsear JSON
app.use(express.json());

// Tabla de código Morse
const morseCodeTable = {
    'A': '.-', 'B': '-...', 'C': '-.-.', 'D': '-..', 'E': '.', 'F': '..-.',
    'G': '--.', 'H': '....', 'I': '..', 'J': '.---', 'K': '-.-', 'L': '.-..',
    'M': '--', 'N': '-.', 'O': '---', 'P': '.--.', 'Q': '--.-', 'R': '.-.',
    'S': '...', 'T': '-', 'U': '..-', 'V': '...-', 'W': '.--', 'X': '-..-',
    'Y': '-.--', 'Z': '--..', '1': '.----', '2': '..---', '3': '...--',
    '4': '....-', '5': '.....', '6': '-....', '7': '--...', '8': '---..',
    '9': '----.', '0': '-----', ' ': ' '
};

// Variables para las estadísticas
let requestCount = 0;
const endpointsCount = 1; // Actualiza según la cantidad de endpoints que tengas

// Función para codificar texto a código Morse
const encodeToMorse = (text) => {
    return text.toUpperCase().split('').map(char => morseCodeTable[char] || '').join(' ');
};

// Función para decodificar código Morse a texto
const decodeFromMorse = (morse) => {
    const reversedMorseCodeTable = Object.fromEntries(
        Object.entries(morseCodeTable).map(([key, value]) => [value, key])
    );
    return morse.split(' ').map(code => reversedMorseCodeTable[code] || '').join('');
};

// Middleware para contar solicitudes
app.use((req, res, next) => {
    requestCount++;
    next();
});

// Endpoint para codificar o decodificar
app.post('/api/morse', (req, res) => {
    const { action, message } = req.body;

    if (!action || !message) {
        return res.status(400).json({ error: 'Action and message are required' });
    }

    if (action === 'encode') {
        return res.json({ result: encodeToMorse(message) });
    } else if (action === 'decode') {
        return res.json({ result: decodeFromMorse(message) });
    } else {
        return res.status(400).json({ error: 'Invalid action. Use "encode" or "decode".' });
    }
});

// Endpoint para obtener estadísticas
app.get('/api/stats', (req, res) => {
    const stats = {
        endpointsCount: endpointsCount,
        userCount: 'Desconocido', // Aquí podrías integrar una lógica real si es necesario
        requestCount: requestCount,
        uptime: '99.9%' // Cambia esto con la lógica real para obtener el tiempo de actividad
    };
    res.json(stats);
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
