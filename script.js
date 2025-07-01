// script.js

document.addEventListener('DOMContentLoaded', () => {
    // Funcionalidad para el menú de perfil desplegable
    const profileIcon = document.querySelector('.profile-icon');
    const profileDropdown = document.querySelector('.profile-dropdown');

    if (profileIcon && profileDropdown) {
        profileIcon.addEventListener('click', (event) => {
            event.stopPropagation(); // Evitar que el clic se propague al documento
            profileDropdown.classList.toggle('active');
        });

        // Cerrar el menú si se hace clic fuera de él
        document.addEventListener('click', (event) => {
            if (!profileMenu.contains(event.target)) {
                profileDropdown.classList.remove('active');
            }
        });
    }


    // Funcionalidad para el campo de búsqueda expandible
    const searchIcon = document.querySelector('.search-icon');
    const searchInput = document.querySelector('.search-input');

    if (searchIcon && searchInput) {
        searchIcon.addEventListener('click', () => {
            searchInput.classList.toggle('active');
            if (searchInput.classList.contains('active')) {
                searchInput.focus(); // Enfocar el input cuando se expande
            } else {
                searchInput.value = ''; // Limpiar el input al colapsar
            }
        });

        // Opcional: Cerrar el input de búsqueda si se hace clic fuera y está vacío
        document.addEventListener('click', (event) => {
            if (!searchBox.contains(event.target) && !searchInput.value) {
                searchInput.classList.remove('active');
            }
        });
    }

    // Nota: La funcionalidad de carruseles (scroll y navegación con flechas)
    // o la carga dinámica de contenido requeriría más JavaScript avanzado.
    // Aquí solo se simula el scroll con CSS 'overflow-x: scroll'.
});