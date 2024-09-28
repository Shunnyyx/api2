document.addEventListener('DOMContentLoaded', function () {
    const statNumbers = document.querySelectorAll('.stat-number');
    
    const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Add class to trigger animation
                statNumbers.forEach(stat => {
                    stat.classList.add('animate');
                    // Optionally, you can implement a counting effect here
                });
                // Stop observing after the animation triggers
                observer.unobserve(entry.target);
            }
        });
    });

    observer.observe(document.querySelector('#stats'));
});
