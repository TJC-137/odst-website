/* 🎭 Evento de clic en el contenedor de personajes */
document.addEventListener("DOMContentLoaded", () => {
    document.querySelectorAll(".character").forEach(img => {
        img.addEventListener("click", () => {
            const characterName = img.alt; 
            window.location.href = `selected-character.html?character=${encodeURIComponent(characterName)}`;
        });
    });
});
