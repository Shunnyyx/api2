document.addEventListener('DOMContentLoaded', function() {
    const menuToggle = document.querySelector('.menu-toggle');
    const mainNav = document.querySelector('.main-nav ul');
    const hasSubmenu = document.querySelectorAll('.has-submenu');
    const themeToggle = document.getElementById('theme-toggle');

    menuToggle.addEventListener('click', function() {
        mainNav.classList.toggle('show');
    });

    hasSubmenu.forEach(item => {
        item.addEventListener('click', function(e) {
            if (e.target.tagName === 'A' || e.target.parentElement.tagName === 'A') {
                e.preventDefault();
                this.classList.toggle('active');
            }
        });
    });

    // Load saved theme
    if (localStorage.getItem('theme') === 'dark') {
        document.body.classList.add('dark-theme');
        updateThemeToggle(true);
    }

    // Theme toggle functionality
    themeToggle.addEventListener('click', function() {
        document.body.classList.toggle('dark-theme');
        const isDarkTheme = document.body.classList.contains('dark-theme');
        localStorage.setItem('theme', isDarkTheme ? 'dark' : 'light');
        updateThemeToggle(isDarkTheme);
    });

    function updateThemeToggle(isDarkTheme) {
        const icon = themeToggle.querySelector('i');
        if (isDarkTheme) {
            icon.classList.remove('fa-moon');
            icon.classList.add('fa-sun');
            themeToggle.textContent = ' Tema Claro';
        } else {
            icon.classList.remove('fa-sun');
            icon.classList.add('fa-moon');
            themeToggle.textContent = ' Tema Oscuro';
        }
        themeToggle.prepend(icon);
    }
});