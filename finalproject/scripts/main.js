import { getYear } from "./utils.js";

document.addEventListener("DOMContentLoaded", () => {
    /* HAMBURGER MENU ON SMALL SCREEN */
    const menuButton = document.querySelector("#menuBtn");
    const nav = document.querySelector(".navMenu");

    menuButton.addEventListener("click", () => {
        nav.classList.toggle("open");
    });

    // Footer year
    const year = document.querySelector("#year");

    if (year) {
        year.textContent = getYear();
    }
    const featuredRecipes = document.querySelector("#featuredRecipes");

    if (featuredRecipes) {
        fetch("data/recipes.json")
            .then(response => response.json())
            .then(recipes => {

                // Get first 4 recipes
                const featured = recipes.slice(0, 4);

                featured.forEach(recipe => {
                    const card = document.createElement("div");
                    card.classList.add("recipe-card");

                    card.innerHTML = `
          <img 
            src="${recipe.image}" 
            alt="${recipe.name}" 
            loading="lazy"
          >

          <h3>${recipe.name}</h3>
          <p><strong>Category:</strong> ${recipe.category}</p>
          <p><strong>Cook Time:</strong> ${recipe.cookTime}</p>
          <a href="recipes.html" class="btn">View Recipe</a>
        `;
                    featuredRecipes.appendChild(card);
                });

            })
            .catch(error => {
                console.error("Error loading recipes:", error);
            });
    }
})