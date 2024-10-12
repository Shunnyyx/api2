document.getElementById('generateKey').addEventListener('click', () => {
    const key = generateApiKey();
    document.getElementById('keyDisplay').textContent = key;
    document.getElementById('copyKey').style.display = 'inline-flex'; // Show the button
});

document.getElementById('copyKey').addEventListener('click', () => {
    const key = document.getElementById('keyDisplay').textContent;
    navigator.clipboard.writeText(key)
        .then(() => {
            alert('API Key copied to clipboard!');
        })
        .catch(err => {
            console.error('Failed to copy: ', err);
        });
});

// Function to generate a random API key
function generateApiKey() {
    return Math.random().toString(36).substr(2, 16).toUpperCase();
}
