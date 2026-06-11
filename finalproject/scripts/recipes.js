document.addEventListener("DOMContentLoaded", () => {

  const lastCategory = localStorage.getItem("selectedCategory");
  if (lastCategory) {
    console.log("Last selected category:", lastCategory);
  }

  const lastRecipe = localStorage.getItem("lastViewedRecipe");
  if (lastRecipe) {
    console.log("Last viewed recipe:", lastRecipe);
  }

  let allRecipes = [];

  const container = document.querySelector("#recipesContainer");
  const searchInput = document.querySelector("#recipeSearch");
  const filterButtons = document.querySelectorAll(".filter-btn");

  // SEARCH FUNCTION
  if (searchInput) {
    searchInput.addEventListener("input", () => {
      const query = searchInput.value.toLowerCase().trim();

      const filtered = allRecipes.filter(recipe =>
        recipe.name.toLowerCase().includes(query) ||
        recipe.category.toLowerCase().includes(query)
      );

      displayRecipes(filtered);
    });
  }
  // FILTER FUNCTION
  if (filterButtons.length > 0) {
    filterButtons.forEach(btn => {
      btn.addEventListener("click", () => {
        filterButtons.forEach(b => b.classList.remove("active"));
        btn.classList.add("active");

        const category = btn.dataset.category;

        localStorage.setItem("selectedCategory", category);

        if (category === "all") {
          displayRecipes(allRecipes);
        } else {
          const filtered = allRecipes.filter(recipe =>
            recipe.category.toLowerCase() === category.toLowerCase()
          );
          displayRecipes(filtered);
        }
      });
    });
  }

  // MODAL FUNCTION
  const modal = document.querySelector("#recipeModal");
  const modalBody = document.querySelector("#modalBody");
  const closeModal = document.querySelector("#closeModal");

  async function loadRecipes() {
    try {
      const res = await fetch("data/recipes.json");
      const data = await res.json();

      allRecipes = data;
      displayRecipes(data);

    } catch (error) {
      container.innerHTML = "<p>Failed to load recipes.</p>";
    }
  }

  function displayRecipes(recipes) {
    container.innerHTML = "";

    recipes.forEach(recipe => {
      const card = document.createElement("div");
      card.classList.add("recipe-card");

      card.innerHTML = `
        <img
          src="${recipe.image}"
          alt="${recipe.name}"
          loading="lazy"
        >

        <h2>${recipe.name}</h2>

        <p><strong>Category:</strong> ${recipe.category}</p>
        <p><strong>Cook Time:</strong> ${recipe.cookTime}</p>
        <p><strong>Difficulty:</strong> ${recipe.difficulty}</p>
        <button data-id="${recipe.id}" class="viewBtn">
          View Details
        </button>
      `;

      container.appendChild(card);
    });

    document.querySelectorAll(".viewBtn").forEach(btn => {
      btn.addEventListener("click", () => {
        const id = Number(btn.dataset.id);
        const recipe = allRecipes.find(r => r.id === id);

        // ✅ LOCAL STORAGE ADDED
        localStorage.setItem("lastViewedRecipe", recipe.name);

        modalBody.innerHTML = `
          <h2>${recipe.name}</h2>

          <img
            src="${recipe.image}"
            alt="${recipe.name}"
            loading="lazy"
            class="modal-image"
          >

          <p><strong>Category:</strong> ${recipe.category}</p>
          <p><strong>Cook Time:</strong> ${recipe.cookTime}</p>
          <p><strong>Difficulty:</strong> ${recipe.difficulty}</p>
          <p><strong>Ingredients:</strong> ${recipe.ingredients}</p>
          <p><strong>Instructions:</strong> ${recipe.instructions}</p>
        `;
        modal.style.display = "block";
      });
    });
  }

  if (modal && closeModal) {
    closeModal.addEventListener("click", () => {
      modal.style.display = "none";
    });
  }

  window.addEventListener("click", (e) => {
    if (e.target === modal) {
      modal.style.display = "none";
    }
  });

  loadRecipes();
})