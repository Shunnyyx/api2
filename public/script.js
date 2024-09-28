document.addEventListener("DOMContentLoaded", function () {
    const counters = document.querySelectorAll('.stat-number');
    const speed = 200; // Velocidad de la animación en milisegundos

    counters.forEach(counter => {
        const updateCount = () => {
            // Obtener el valor objetivo del atributo data-target
            const target = +counter.getAttribute('data-target');
            // Obtener el número actual
            const count = +counter.innerText;

            // Calcular el incremento
            const increment = target / speed;

            // Comprobar si el número actual es menor que el objetivo
            if (count < target) {
                // Actualizar el número
                counter.innerText = Math.ceil(count + increment);
                // Llamar de nuevo a la función
                setTimeout(updateCount, 1);
            } else {
                counter.innerText = target; // Asegurarse de que el número final sea el objetivo
            }
        };

        updateCount();
    });
});
