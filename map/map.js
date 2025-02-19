const mapContainer = document.querySelector('.map-container');
const mapImage = document.querySelector('#map');

let scale = 1, minScale = 1, maxScale = 4;
let translateX = 0, translateY = 0;
let isDragging = false, startX, startY;

// Eventos para el desplazamiento con el mouse
mapImage.addEventListener('mousedown', (e) => {
    isDragging = true;
    startX = e.clientX - translateX;
    startY = e.clientY - translateY;
    mapImage.style.cursor = 'grabbing';
});

window.addEventListener('mouseup', () => {
    isDragging = false;
    mapImage.style.cursor = 'grab';
});

mapImage.addEventListener('mousemove', (e) => {
    if (!isDragging) return;
    e.preventDefault();
    translateX = e.clientX - startX;
    translateY = e.clientY - startY;
    clampPosition();
    updateTransform();
});

// Eventos para el desplazamiento táctil
mapImage.addEventListener('touchstart', (e) => {
    if (e.touches.length === 1) { // Solo un dedo para desplazar
        isDragging = true;
        startX = e.touches[0].clientX - translateX;
        startY = e.touches[0].clientY - translateY;
    }
});

window.addEventListener('touchend', () => {
    isDragging = false;
});

mapImage.addEventListener('touchmove', (e) => {
    if (!isDragging || e.touches.length !== 1) return;
    e.preventDefault();
    translateX = e.touches[0].clientX - startX;
    translateY = e.touches[0].clientY - startY;
    clampPosition();
    updateTransform();
});

// Zoom con la rueda del mouse
mapContainer.addEventListener('wheel', (e) => {
    e.preventDefault();
    const scaleFactor = e.deltaY > 0 ? 0.9 : 1.1;
    const newScale = Math.min(Math.max(scale * scaleFactor, minScale), maxScale);
    zoomAtPoint(e.clientX, e.clientY, newScale);
});

// Zoom con gesto de pellizco (para móviles)
let initialDistance = null;

mapContainer.addEventListener('touchstart', (e) => {
    if (e.touches.length === 2) { // Dos dedos para hacer zoom
        initialDistance = getDistance(e.touches[0], e.touches[1]);
    }
});

mapContainer.addEventListener('touchmove', (e) => {
    if (e.touches.length === 2 && initialDistance !== null) {
        e.preventDefault();
        const currentDistance = getDistance(e.touches[0], e.touches[1]);
        const scaleFactor = currentDistance / initialDistance;
        const newScale = Math.min(Math.max(scale * scaleFactor, minScale), maxScale);

        // Calcular el punto medio entre los dos dedos
        const midX = (e.touches[0].clientX + e.touches[1].clientX) / 2;
        const midY = (e.touches[0].clientY + e.touches[1].clientY) / 2;

        zoomAtPoint(midX, midY, newScale);
        initialDistance = currentDistance;
    }
});

mapContainer.addEventListener('touchend', () => {
    initialDistance = null;
});

// Función para calcular la distancia entre dos puntos táctiles
function getDistance(touch1, touch2) {
    return Math.hypot(
        touch2.clientX - touch1.clientX,
        touch2.clientY - touch1.clientY
    );
}

// Función para hacer zoom en un punto específico
function zoomAtPoint(x, y, newScale) {
    const rect = mapImage.getBoundingClientRect();
    const offsetX = (x - rect.left) / scale;
    const offsetY = (y - rect.top) / scale;

    translateX -= (offsetX * newScale - offsetX * scale);
    translateY -= (offsetY * newScale - offsetY * scale);

    scale = newScale;
    clampPosition();
    updateTransform();
}

// Función para limitar el desplazamiento dentro de los bordes del mapa
function clampPosition() {
    const rect = mapContainer.getBoundingClientRect();
    const imgWidth = mapImage.naturalWidth * scale;
    const imgHeight = mapImage.naturalHeight * scale;

    const minX = Math.min(0, rect.width - imgWidth);
    const minY = Math.min(0, rect.height - imgHeight);

    translateX = Math.max(minX, Math.min(translateX, 0));
    translateY = Math.max(minY, Math.min(translateY, 0));
}

// Función para actualizar la transformación del mapa
function updateTransform() {
    mapImage.style.transform = `translate(${translateX}px, ${translateY}px) scale(${scale})`;
}