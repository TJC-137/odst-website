/* 🎭 Selected Character */
document.addEventListener("DOMContentLoaded", () => {
    const params = new URLSearchParams(window.location.search);
    const characterName = params.get("character");

    if (!characterName) {
        alert("Personaje no encontrado.");
        window.location.href = "characters.html";
        return;
    }

    const character = squadData.squad.find(c => c.alias.toLowerCase() === characterName.toLowerCase());

    if (!character) {
        alert("Personaje no encontrado.");
        window.location.href = "characters.html";
        return;
    }

    document.title = `${character.alias} - Halo ODST`;

    renderCharacter(character);
    setupGallery();
});

/* 🎭 Render Character */
function renderCharacter(character) {
    document.getElementById("character-alias").textContent = character.alias;
    document.getElementById("character-name").textContent = character.name;
    document.getElementById("character-rank").textContent = character.rank;
    document.getElementById("character-role").textContent = character.role;
    document.getElementById("character-status").textContent = character.status;
    document.getElementById("character-lore").textContent = character.lore;

    setImage("character-banner", character["image-banner"]);
    setImage("character-profile", character["image-profile"]);
    setImage("character-image-1", character["image-1"]);
    setImage("character-image-2", character["image-2"]);
}

function setImage(id, src, fallback = "default-image.jpg") {
    const imgElement = document.getElementById(id);
    if (imgElement) {
        imgElement.src = src || fallback;
    }
}

/* 🎭 Gallery */
function setupGallery() {
    const modal = document.createElement("div");
    modal.classList.add("modal");
    modal.innerHTML = `
        <span class="modal-close">&times;</span>
        <img class="modal-content">
    `;
    document.body.appendChild(modal);

    const modalImg = modal.querySelector(".modal-content");
    const closeModal = modal.querySelector(".modal-close");

    document.querySelectorAll(".gallery-container img").forEach(img => {
        img.addEventListener("click", () => {
            if (img.src && !img.src.includes("default-image.jpg")) {
                modal.style.display = "flex";
                modalImg.src = img.src;
            }
        });
    });

    closeModal.addEventListener("click", () => {
        modal.style.display = "none";
    });

    modal.addEventListener("click", (event) => {
        if (event.target === modal) {
            modal.style.display = "none";
        }
    });
}
