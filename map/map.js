document.addEventListener("DOMContentLoaded", () => {
    const mapContainer = document.querySelector(".map-container");
    const map = document.getElementById("map");

    let scale = 1;
    let posX = 0, posY = 0;
    let isDragging = false;
    let startX, startY;

    // 🟢 Zoom con scroll - Suavizado y centrado en el cursor
    mapContainer.addEventListener("wheel", (event) => {
        event.preventDefault();

        const scaleAmount = event.deltaY * -0.002; // Control de zoom más fluido
        const prevScale = scale;

        scale = Math.min(Math.max(1, scale + scaleAmount), 3); // Zoom entre 1x y 3x

        // Ajustar para que el zoom sea centrado en el cursor
        const rect = map.getBoundingClientRect();
        const offsetX = (event.clientX - rect.left) / rect.width;
        const offsetY = (event.clientY - rect.top) / rect.height;

        posX -= (offsetX * rect.width - posX) * (scale - prevScale);
        posY -= (offsetY * rect.height - posY) * (scale - prevScale);

        updateTransform();
    });

    // 🟡 Iniciar drag con click
    mapContainer.addEventListener("mousedown", (event) => {
        isDragging = true;
        startX = event.clientX - posX;
        startY = event.clientY - posY;
        map.style.cursor = "grabbing";
    });

    // 🟠 Mover mientras se arrastra
    window.addEventListener("mousemove", (event) => {
        if (!isDragging) return;
        posX = event.clientX - startX;
        posY = event.clientY - startY;
        updateTransform();
    });

    // 🔴 Soltar drag al dejar de hacer click
    window.addEventListener("mouseup", () => {
        isDragging = false;
        map.style.cursor = "grab";
    });

    // 🚫 No permitir salir fuera del área visible
    function enforceBounds() {
        const rect = map.getBoundingClientRect();
        const containerRect = mapContainer.getBoundingClientRect();

        const minX = containerRect.width - rect.width * scale;
        const minY = containerRect.height - rect.height * scale;
        
        posX = Math.min(0, Math.max(minX, posX));
        posY = Math.min(0, Math.max(minY, posY));
    }

    // 🔹 Aplica los cambios al estilo de la imagen
    function updateTransform() {
        enforceBounds();
        map.style.transform = `translate(${posX}px, ${posY}px) scale(${scale})`;
    }
});
