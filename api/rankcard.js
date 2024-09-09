document.addEventListener('DOMContentLoaded', () => {
    // Puedes reemplazar esto con la URL de tu API si es necesario
    const jsonDataUrl = 'rankcard.json';

    // Función para actualizar la rank card
    const updateRankCard = (data) => {
        // Crear elementos HTML para la rank card
        const rankCard = document.createElement('div');
        rankCard.className = 'rank-card';

        // Crear y agregar el avatar
        const avatar = document.createElement('img');
        avatar.className = 'avatar';
        avatar.src = data.avatarUrl;
        avatar.alt = 'Avatar';
        rankCard.appendChild(avatar);

        // Crear y agregar la información del usuario
        const info = document.createElement('div');
        info.className = 'info';

        const username = document.createElement('h2');
        username.textContent = data.username;
        info.appendChild(username);

        const level = document.createElement('p');
        level.textContent = `Level: ${data.level}`;
        info.appendChild(level);

        const totalPoints = document.createElement('p');
        totalPoints.textContent = `Points: ${data.totalPoints}`;
        info.appendChild(totalPoints);

        const rank = document.createElement('p');
        rank.innerHTML = `Rank: ${data.rank} / ${data.maxRank}`;
        info.appendChild(rank);

        const progressBarContainer = document.createElement('div');
        progressBarContainer.className = 'progress-bar';

        const progress = document.createElement('div');
        progress.className = 'progress';
        progress.style.width = `${data.progress}%`;

        progressBarContainer.appendChild(progress);
        info.appendChild(progressBarContainer);

        rankCard.appendChild(info);

        // Agregar la rank card al cuerpo del documento
        document.body.appendChild(rankCard);
    };

    // Fetch data from JSON file or API endpoint
    fetch(jsonDataUrl)
        .then(response => response.json())
        .then(data => updateRankCard(data))
        .catch(error => console.error('Error fetching rank card data:', error));
});
