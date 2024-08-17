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

    // Theme toggle functionality
    themeToggle.addEventListener('click', function() {
        document.body.classList.toggle('dark-theme');
        const icon = this.querySelector('i');
        if (document.body.classList.contains('dark-theme')) {
            icon.classList.remove('fa-moon');
            icon.classList.add('fa-sun');
            this.textContent = ' Tema Claro';
            this.prepend(icon);
        } else {
            icon.classList.remove('fa-sun');
            icon.classList.add('fa-moon');
            this.textContent = ' Tema Oscuro';
            this.prepend(icon);
        }
    });
});