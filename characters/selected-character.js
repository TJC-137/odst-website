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
});

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
}

function setImage(id, src, fallback = "default-image.jpg") {
    document.getElementById(id).src = src || fallback;
}
