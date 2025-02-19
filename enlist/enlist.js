document.addEventListener("DOMContentLoaded", function() {
    const enlistButton = document.getElementById("enlistButton");
    const formContainer = document.getElementById("form-container");
    const submitButton = document.getElementById("submitButton");
    const nameInput = document.getElementById("nameInput");
    const welcomeContainer = document.getElementById("welcome-container");
    const welcomeMessage = document.getElementById("welcome-message");
    const odstImage = document.getElementById("odst-army");
    const featuredImage = document.getElementById("featured-image");
    const carouselImages = document.querySelectorAll(".carousel img");

    // Ocultamos el formulario al inicio
    formContainer.style.display = "none";
    welcomeContainer.style.display = "none";

    // Mostrar el formulario al hacer clic en ENLIST
    enlistButton.addEventListener("click", function() {
        formContainer.style.display = "flex"; // Mostrarlo con flex para respetar la alineación
        nameInput.focus();

        // Scroll hasta el final de la página
        window.scrollTo({ top: document.body.scrollHeight, behavior: "smooth" });
    });

    // Capturar el nombre y mostrar mensaje de bienvenida
    function submitForm() {
        const name = nameInput.value.trim();

        if (name) {
            welcomeMessage.textContent = `Welcome to the ODST, ${name}!`;
            welcomeContainer.style.display = "flex"; // Mostrar mensaje de bienvenida
            odstImage.style.display = "block"; // Mostrar imagen de ODST
            formContainer.style.display = "none"; // Ocultar formulario
        
            // Scroll hasta el final de la página
            window.scrollTo({ top: document.body.scrollHeight, behavior: "smooth" });
        }
    }

    submitButton.addEventListener("click", submitForm);

    // Enviar formulario con Enter
    nameInput.addEventListener("keypress", function(event) {
        if (event.key === "Enter") {
            submitForm();
        }
    });

    // Funcionalidad del carrusel
    carouselImages.forEach(img => {
        img.addEventListener("click", function() {
            const tempSrc = featuredImage.src;
            featuredImage.src = img.src;
            img.src = tempSrc;

            // Resaltar la imagen seleccionada
            carouselImages.forEach(i => i.classList.remove("selected"));
            img.classList.add("selected");
        });
    });
});
