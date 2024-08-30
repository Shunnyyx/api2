document.addEventListener('DOMContentLoaded', () => {
    const form = document.querySelector('#morse-form');
    const resultContainer = document.querySelector('#result');

    form.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const action = document.querySelector('input[name="action"]:checked').value;
        const message = document.querySelector('#message').value;

        fetch('https://api.aiko.top/api/morse', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ action, message })
        })
        .then(response => response.json())
        .then(data => {
            resultContainer.textContent = data.result;
        })
        .catch(error => {
            resultContainer.textContent = 'Error: ' + error.message;
        });
    });
});
