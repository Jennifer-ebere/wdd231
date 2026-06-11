document.addEventListener("DOMContentLoaded", () => {
    const params = new URLSearchParams(window.location.search);

    const fullname = document.getElementById("fullname");
    const email = document.getElementById("email");
    const recipeName = document.getElementById("recipeName");
    const category = document.getElementById("category");
    const instructions = document.getElementById("instructions");

    if (fullname && email && recipeName && category && instructions) {
        fullname.textContent = params.get("fullname");
        email.textContent = params.get("email");
        recipeName.textContent = params.get("recipeName");
        category.textContent = params.get("category");
        instructions.textContent = params.get("instructions");
    }
})