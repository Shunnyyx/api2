document.getElementById('generateKey').addEventListener('click', () => {
    fetch('/generate-key', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
    })
    .then(response => response.json())
    .then(data => {
        document.getElementById('result').textContent = `Generated API Key: ${data.key}`;
    })
    .catch(error => console.error('Error:', error));
});
