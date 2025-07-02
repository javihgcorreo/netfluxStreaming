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

document.addEventListener('DOMContentLoaded', () => {
    // ... (tu código JavaScript existente para otros formularios y funcionalidades) ...

    const manageProfilesBtn = document.querySelector('.manage-profiles-btn');

    if (manageProfilesBtn) {
        manageProfilesBtn.addEventListener('click', () => {
            // Redirige al usuario a la página del formulario de gestión de perfiles
            window.location.href = 'usuariosForm.html';
        });
    }
});

document.addEventListener('DOMContentLoaded', () => {
    // ... (Tu código JavaScript existente para otros formularios como el de usuariosForm.html) ...

    const mainSearchInput = document.getElementById('main-search-input');
    const searchButton = document.querySelector('.search-button');
    const autocompleteSuggestions = document.getElementById('autocomplete-suggestions');
    const toggleFiltersBtn = document.getElementById('toggle-filters-btn');
    const filtersForm = document.getElementById('filters-form');
    const filterGenreSelect = document.getElementById('filter-genre');
    const filterYearSelect = document.getElementById('filter-year');
    const filterLanguageSelect = document.getElementById('filter-language');
    const filterRatingSelect = document.getElementById('filter-rating');
    const applyFiltersBtn = document.querySelector('.apply-filters-btn');
    const clearFiltersBtn = document.querySelector('.clear-filters-btn');
    const resultsDisplay = document.getElementById('results-display');
    const filterFormMessage = document.getElementById('filter-form-message');

    // --- Lógica para la barra de búsqueda principal y autocompletado ---
    const mockContentTitles = [
        "La Casa de Papel", "Stranger Things", "The Crown", "Gambito de Dama",
        "Élite", "Ozark", "Dark", "El juego del calamar", "Vikingos", "The Witcher",
        "Bird Box", "Misterio a Bordo", "Roma", "Fragmentos de una mujer", "El irlandés"
    ];

    mainSearchInput.addEventListener('input', () => {
        const query = mainSearchInput.value.toLowerCase();
        autocompleteSuggestions.innerHTML = ''; // Limpiar sugerencias anteriores

        if (query.length > 1) { // Mostrar sugerencias después de 2 caracteres
            const filteredSuggestions = mockContentTitles.filter(title =>
                title.toLowerCase().includes(query)
            );

            if (filteredSuggestions.length > 0) {
                filteredSuggestions.forEach(suggestion => {
                    const div = document.createElement('div');
                    div.classList.add('autocomplete-suggestion-item');
                    div.textContent = suggestion;
                    div.addEventListener('click', () => {
                        mainSearchInput.value = suggestion;
                        autocompleteSuggestions.innerHTML = ''; // Limpiar después de seleccionar
                        performSearch(); // Realizar búsqueda al seleccionar
                    });
                    autocompleteSuggestions.appendChild(div);
                });
            }
        }
    });

    // Ocultar sugerencias si se hace clic fuera
    document.addEventListener('click', (e) => {
        if (!mainSearchInput.contains(e.target) && !autocompleteSuggestions.contains(e.target)) {
            autocompleteSuggestions.innerHTML = '';
        }
    });

    searchButton.addEventListener('click', () => {
        performSearch();
    });

    mainSearchInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            performSearch();
            autocompleteSuggestions.innerHTML = ''; // Ocultar sugerencias al presionar Enter
        }
    });

    function performSearch() {
        const searchTerm = mainSearchInput.value.trim();
        if (searchTerm) {
            resultsDisplay.textContent = `Buscando: "${searchTerm}"... (Aquí se mostrarían los resultados reales)`;
            // Aquí iría la lógica para llamar a una API de búsqueda
            console.log('Realizando búsqueda principal para:', searchTerm);
        } else {
            resultsDisplay.textContent = 'Por favor, introduce un término de búsqueda.';
        }
        filterFormMessage.textContent = ''; // Limpiar mensajes de filtro
    }

    // --- Lógica para mostrar/ocultar filtros avanzados ---
    toggleFiltersBtn.addEventListener('click', () => {
        filtersForm.classList.toggle('filters-visible');
        if (filtersForm.classList.contains('filters-visible')) {
            toggleFiltersBtn.textContent = 'Ocultar Filtros Avanzados';
        } else {
            toggleFiltersBtn.textContent = 'Mostrar Filtros Avanzados';
        }
    });

    // --- Lógica para aplicar filtros ---
    filtersForm.addEventListener('submit', (e) => {
        e.preventDefault(); // Evitar el envío por defecto del formulario

        filterFormMessage.textContent = '';
        filterFormMessage.style.color = '#e87c03';

        const selectedGenre = filterGenreSelect.value;
        const selectedYear = filterYearSelect.value;
        const selectedLanguage = filterLanguageSelect.value;
        const selectedRating = filterRatingSelect.value;

        // Aquí iría la lógica para aplicar los filtros y buscar resultados
        console.log('Aplicando filtros:', {
            genre: selectedGenre,
            year: selectedYear,
            language: selectedLanguage,
            rating: selectedRating
        });

        let filterSummary = [];
        if (selectedGenre) filterSummary.push(`Género: ${filterGenreSelect.options[filterGenreSelect.selectedIndex].text}`);
        if (selectedYear) filterSummary.push(`Año: ${selectedYear}`);
        if (selectedLanguage) filterSummary.push(`Idioma: ${filterLanguageSelect.options[filterLanguageSelect.selectedIndex].text}`);
        if (selectedRating) filterSummary.push(`Clasificación: ${filterRatingSelect.options[filterRatingSelect.selectedIndex].text}`);

        if (filterSummary.length > 0) {
            resultsDisplay.textContent = `Resultados con filtros aplicados: ${filterSummary.join(', ')} (Aquí se mostrarían los resultados reales)`;
            filterFormMessage.style.color = '#46d369';
            filterFormMessage.textContent = 'Filtros aplicados.';
        } else {
            resultsDisplay.textContent = 'No se han aplicado filtros. Realiza una búsqueda o selecciona filtros.';
            filterFormMessage.textContent = 'No se han seleccionado filtros.';
        }
        // En un caso real, esto dispararía una nueva búsqueda con los filtros
    });

    // --- Lógica para limpiar filtros ---
    clearFiltersBtn.addEventListener('click', () => {
        filterGenreSelect.value = '';
        filterYearSelect.value = '';
        filterLanguageSelect.value = '';
        filterRatingSelect.value = '';
        filterFormMessage.style.color = '#b3b3b3'; // Color neutro
        filterFormMessage.textContent = 'Filtros limpiados. Aplica nuevos filtros para buscar.';
        resultsDisplay.textContent = 'No se han encontrado resultados o no se ha realizado ninguna búsqueda.';
        console.log('Filtros limpiados.');
        // Opcional: podrías disparar una búsqueda sin filtros aquí
    });
});

document.addEventListener('DOMContentLoaded', () => {
    // ... (Tu código JavaScript existente para otros formularios) ...

    const currentPlanDisplay = document.getElementById('current-plan-display');
    const currentPriceDisplay = document.getElementById('current-price-display');
    const nextBillingDate = document.getElementById('next-billing-date');
    const changePlanBtn = document.getElementById('change-plan-btn');
    const planSelectionForm = document.getElementById('plan-selection-form');
    const planRadios = document.querySelectorAll('input[name="subscription_plan"]');
    const planMessage = document.getElementById('plan-message');
    const cancelChangeBtn = document.querySelector('.cancel-change-btn');

    const paymentInfoForm = document.getElementById('payment-info-form');
    const cardNumberInput = document.getElementById('card-number');
    const expiryDateInput = document.getElementById('expiry-date');
    const cvvInput = document.getElementById('cvv');
    const cardNameInput = document.getElementById('card-name');
    const paymentMessage = document.getElementById('payment-message');

    // --- Simulación de carga de datos de usuario ---
    // En un entorno real, estos datos vendrían de una API
    let userSubscription = {
        plan: 'Standard',
        price: 9.99,
        billingDate: '15 de Julio de 2025',
        paymentMethod: {
            cardNumberLast4: '1234',
            expiryMonth: '12',
            expiryYear: '26',
            cardHolderName: 'Juan Pérez'
        }
    };

    function loadSubscriptionData() {
        if (currentPlanDisplay) { // Asegura que estamos en la página correcta
            currentPlanDisplay.textContent = userSubscription.plan;
            currentPriceDisplay.textContent = `${userSubscription.price.toFixed(2)}€`;
            nextBillingDate.textContent = userSubscription.billingDate;

            // Cargar información de pago existente (simulado)
            if (userSubscription.paymentMethod && cardNumberInput) {
                // No cargamos el número completo por seguridad, solo un placeholder
                cardNumberInput.value = `************${userSubscription.paymentMethod.cardNumberLast4}`;
                expiryDateInput.value = `${userSubscription.paymentMethod.expiryMonth}/${userSubscription.paymentMethod.expiryYear.substring(2)}`;
                cardNameInput.value = userSubscription.paymentMethod.cardHolderName;
            }
        }
    }

    // Cargar datos al iniciar
    loadSubscriptionData();

    // --- Lógica de Cambio de Plan ---
    if (changePlanBtn) {
        changePlanBtn.addEventListener('click', () => {
            planSelectionForm.classList.remove('form-hidden');
            planSelectionForm.classList.add('form-visible');
            changePlanBtn.style.display = 'none'; // Ocultar botón de "Cambiar Plan"
            planMessage.textContent = '';

            // Marcar el radio button del plan actual
            planRadios.forEach(radio => {
                if (radio.value.toLowerCase() === userSubscription.plan.toLowerCase()) {
                    radio.checked = true;
                } else {
                    radio.checked = false;
                }
            });
        });
    }

    if (cancelChangeBtn) {
        cancelChangeBtn.addEventListener('click', () => {
            planSelectionForm.classList.remove('form-visible');
            planSelectionForm.classList.add('form-hidden');
            changePlanBtn.style.display = 'block'; // Mostrar botón de "Cambiar Plan"
            planMessage.textContent = '';
            // Desmarcar todos los radios al cancelar
            planRadios.forEach(radio => radio.checked = false);
        });
    }

    if (planSelectionForm) {
        planSelectionForm.addEventListener('submit', (e) => {
            e.preventDefault();
            planMessage.textContent = '';
            planMessage.style.color = '#e87c03';

            const selectedPlanRadio = document.querySelector('input[name="subscription_plan"]:checked');
            if (!selectedPlanRadio) {
                planMessage.textContent = 'Por favor, selecciona un plan.';
                return;
            }

            const newPlanName = selectedPlanRadio.value;
            const newPlanPrice = parseFloat(selectedPlanRadio.dataset.price);

            if (newPlanName.toLowerCase() === userSubscription.plan.toLowerCase()) {
                planMessage.textContent = 'Ya tienes este plan seleccionado.';
                planMessage.style.color = '#b3b3b3';
                return;
            }

            // Simular el cambio de plan
            console.log('Cambiando plan a:', newPlanName, 'por', newPlanPrice, '€');
            // Aquí iría la llamada a la API para actualizar la suscripción

            userSubscription.plan = newPlanName.charAt(0).toUpperCase() + newPlanName.slice(1); // Capitalize first letter
            userSubscription.price = newPlanPrice;
            // Actualizar la fecha de cobro si el plan cambia (simulado)
            userSubscription.billingDate = '15 de Agosto de 2025'; // Ejemplo

            loadSubscriptionData(); // Actualizar el resumen
            planMessage.style.color = '#46d369';
            planMessage.textContent = `¡Plan cambiado a ${userSubscription.plan} con éxito!`;

            // Opcional: ocultar el formulario de selección de plan después del cambio
            setTimeout(() => {
                planSelectionForm.classList.remove('form-visible');
                planSelectionForm.classList.add('form-hidden');
                changePlanBtn.style.display = 'block';
            }, 2000);
        });
    }

    // --- Lógica de Actualización de Información de Pago ---
    if (paymentInfoForm) {
        // Formatear la entrada del número de tarjeta
        cardNumberInput.addEventListener('input', (e) => {
            let value = e.target.value.replace(/\s+/g, ''); // Eliminar espacios
            let formattedValue = '';
            for (let i = 0; i < value.length; i++) {
                if (i > 0 && i % 4 === 0) {
                    formattedValue += ' ';
                }
                formattedValue += value[i];
            }
            e.target.value = formattedValue.trim();
        });

        // Formatear la entrada de fecha de vencimiento (MM/AA)
        expiryDateInput.addEventListener('input', (e) => {
            let value = e.target.value.replace(/\D/g, ''); // Solo dígitos
            if (value.length > 2) {
                value = value.substring(0, 2) + '/' + value.substring(2, 4);
            }
            e.target.value = value;
        });

        paymentInfoForm.addEventListener('submit', (e) => {
            e.preventDefault();
            paymentMessage.textContent = '';
            paymentMessage.style.color = '#e87c03';

            const cardNumber = cardNumberInput.value.replace(/\s+/g, '');
            const expiryDate = expiryDateInput.value;
            const cvv = cvvInput.value;
            const cardName = cardNameInput.value.trim();

            // Validaciones básicas de la tarjeta
            if (!cardNumber || !expiryDate || !cvv || !cardName) {
                paymentMessage.textContent = 'Por favor, rellena todos los campos de pago.';
                return;
            }
            if (!/^[0-9]{13,16}$/.test(cardNumber)) {
                paymentMessage.textContent = 'Número de tarjeta inválido.';
                return;
            }
            if (!/^(0[1-9]|1[0-2])\/([0-9]{2})$/.test(expiryDate)) {
                paymentMessage.textContent = 'Formato de fecha de vencimiento incorrecto (MM/AA).';
                return;
            }
            const [month, year] = expiryDate.split('/').map(Number);
            const currentYear = new Date().getFullYear() % 100; // Últimos 2 dígitos
            const currentMonth = new Date().getMonth() + 1; // getMonth es 0-11

            if (year < currentYear || (year === currentYear && month < currentMonth)) {
                paymentMessage.textContent = 'La tarjeta ha caducado.';
                return;
            }
            if (!/^[0-9]{3,4}$/.test(cvv)) {
                paymentMessage.textContent = 'CVV inválido.';
                return;
            }

            // Simular el envío de datos de pago
            console.log('Actualizando método de pago:', {
                cardNumber: `************${cardNumber.slice(-4)}`, // Por seguridad, solo últimos 4
                expiryDate: expiryDate,
                cvv: cvv,
                cardName: cardName
            });

            // Aquí iría la llamada a la API para actualizar el método de pago
            userSubscription.paymentMethod.cardNumberLast4 = cardNumber.slice(-4);
            userSubscription.paymentMethod.expiryMonth = expiryDate.substring(0,2);
            userSubscription.paymentMethod.expiryYear = `20${expiryDate.substring(3,5)}`; // Asumiendo formato YY
            userSubscription.paymentMethod.cardHolderName = cardName;

            paymentMessage.style.color = '#46d369';
            paymentMessage.textContent = '¡Método de pago actualizado con éxito!';
            // En un caso real, no resetearías los campos completos de la tarjeta
            // cardNumberInput.value = `************${cardNumber.slice(-4)}`;
            // cvvInput.value = ''; // Limpiar CVV por seguridad
        });
    }

    // --- Lógica del botón de Historial de Pagos ---
    const viewHistoryBtn = document.getElementById('view-history-btn');
    if (viewHistoryBtn) {
        viewHistoryBtn.addEventListener('click', (e) => {
            e.preventDefault();
            alert('Simulación: Redirigiendo a tu historial de pagos completo o mostrando una tabla aquí mismo.');
            // En una aplicación real, aquí cargarías una sección con el historial
            // o redirigirías a una página dedicada de historial de pagos.
            console.log('Ver historial de pagos.');
        });
    }
});

document.addEventListener('DOMContentLoaded', () => {
    // ... (Tu código JavaScript existente para otros formularios) ...

    const contactForm = document.getElementById('contact-form');
    const contactNameInput = document.getElementById('contact-name');
    const contactEmailInput = document.getElementById('contact-email');
    const contactSubjectSelect = document.getElementById('contact-subject');
    const contactMessageTextarea = document.getElementById('contact-message');
    const contactFormMessage = document.getElementById('contact-form-message');

    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault(); // Evitar el envío por defecto del formulario

            contactFormMessage.textContent = ''; // Limpiar mensaje anterior
            contactFormMessage.style.color = '#e87c03'; // Color por defecto para errores

            const name = contactNameInput.value.trim();
            const email = contactEmailInput.value.trim();
            const subject = contactSubjectSelect.value;
            const message = contactMessageTextarea.value.trim();

            // Validaciones básicas
            if (!name || !email || !subject || !message) {
                contactFormMessage.textContent = 'Por favor, rellena todos los campos obligatorios.';
                return;
            }

            if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
                contactFormMessage.textContent = 'Por favor, introduce un email válido.';
                return;
            }

            // Simular el envío de los datos
            console.log('Mensaje de contacto enviado:', {
                name: name,
                email: email,
                subject: subject,
                message: message
            });

            // En una aplicación real, aquí harías una llamada a una API
            // y manejarías la respuesta del servidor (éxito/error)

            // Simulación de éxito
            contactFormMessage.style.color = '#46d369'; // Verde para éxito
            contactFormMessage.textContent = '¡Gracias! Tu mensaje ha sido enviado con éxito.';

            // Limpiar el formulario después del envío exitoso
            contactForm.reset();
            // Restablecer el select a la opción por defecto
            contactSubjectSelect.value = '';
        });
    }
});

document.addEventListener('DOMContentLoaded', () => {
    const accessForm = document.getElementById('access-form');
    const formTitle = document.getElementById('form-title');
    const submitBtn = document.getElementById('submit-btn');
    const toggleLink = document.getElementById('toggle-link');
    const toggleText = document.getElementById('toggle-text');
    const confirmPasswordGroup = document.getElementById('confirm-password-group');
    const emailInput = document.getElementById('email');
    const passwordInput = document.getElementById('password');
    const confirmPasswordInput = document.getElementById('confirm-password');
    const formMessage = document.getElementById('form-message');

    let isRegisterMode = false; // Estado inicial: Inicio de Sesión

    // Función para alternar entre modo de registro y login
    toggleLink.addEventListener('click', (e) => {
        e.preventDefault();
        isRegisterMode = !isRegisterMode;
        if (isRegisterMode) {
            formTitle.textContent = 'Regístrate';
            submitBtn.textContent = 'Registrarse';
            toggleText.innerHTML = '¿Ya tienes cuenta? <a href="#" id="toggle-link-inner">Inicia sesión ahora</a>.';
            confirmPasswordGroup.style.display = 'block';
            confirmPasswordInput.setAttribute('required', 'required'); // Confirm password is required for registration
        } else {
            formTitle.textContent = 'Iniciar Sesión';
            submitBtn.textContent = 'Iniciar Sesión';
            toggleText.innerHTML = '¿No tienes cuenta? <a href="#" id="toggle-link-inner">Regístrate ahora</a>.';
            confirmPasswordGroup.style.display = 'none';
            confirmPasswordInput.removeAttribute('required');
        }
        // Re-attach event listener to the new toggle link
        document.getElementById('toggle-link-inner').addEventListener('click', toggleLink.click);
        formMessage.textContent = ''; // Limpiar mensajes al cambiar de modo
        accessForm.reset(); // Limpiar campos del formulario
    });

    // Manejo del envío del formulario
    accessForm.addEventListener('submit', (e) => {
        e.preventDefault(); // Evitar el envío por defecto del formulario

        formMessage.textContent = ''; // Limpiar mensaje anterior

        const email = emailInput.value;
        const password = passwordInput.value;
        const confirmPassword = confirmPasswordInput.value;

        // Validación básica
        if (!email || !password) {
            formMessage.textContent = 'Por favor, rellena todos los campos obligatorios.';
            return;
        }

        if (isRegisterMode) {
            // Lógica de validación para REGISTRO
            if (password.length < 6) {
                formMessage.textContent = 'La contraseña debe tener al menos 6 caracteres.';
                return;
            }
            if (password !== confirmPassword) {
                formMessage.textContent = 'Las contraseñas no coinciden.';
                return;
            }
            // Aquí iría la lógica para enviar los datos de registro a un servidor
            console.log('Datos de registro:', { email, password });
            formMessage.textContent = 'Registro exitoso. ¡Bienvenido a Netflux!';
            accessForm.reset();
            // Podrías redirigir al usuario o iniciar sesión automáticamente
        } else {
            // Lógica de validación para INICIO DE SESIÓN
            // En un entorno real, aquí se verificarían las credenciales con un servidor
            console.log('Datos de inicio de sesión:', { email, password });
            if (email === 'test@netflux.com' && password === 'password123') { // Ejemplo simple
                formMessage.textContent = 'Inicio de sesión exitoso. ¡Disfruta de Netflux!';
                accessForm.reset();
                // Redirigir al usuario a la página principal de Netflux
            } else {
                formMessage.textContent = 'Email o contraseña incorrectos. Inténtalo de nuevo.';
            }
        }
    });

    // Re-attach initial event listener for the toggle link
    // This is necessary because the innerHTML update removes the original listener
    const initialToggleLink = document.getElementById('toggle-link');
    if (initialToggleLink) {
        initialToggleLink.addEventListener('click', toggleLink.click);
    }
});