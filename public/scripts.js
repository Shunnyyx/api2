document.querySelectorAll('.dropdown span').forEach(item => {
    item.addEventListener('click', () => {
        const dropdown = item.parentElement;
        dropdown.classList.toggle('active');
    });
});
