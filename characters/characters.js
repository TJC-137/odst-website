/* 🎭 Character selection */
document.addEventListener("DOMContentLoaded", () => {
    document.querySelectorAll(".character").forEach(img => {
        img.addEventListener("click", () => {
            const characterName = img.alt; 
            window.location.href = `selected-character.html?character=${encodeURIComponent(characterName)}`;
        });
    });
});
