import { places } from '../data/places.mjs';

document.addEventListener("DOMContentLoaded", () => {

    /* DISCOVERY PAGE*/
    const container = document.getElementById("discover-grid");

    if (container) {
        places.forEach((place) => {

            const card = document.createElement("div");
            card.classList.add("discover-card");

            card.innerHTML = `
            <figure>
                <img src="${place.image}" alt="${place.name}" loading="lazy">
            </figure>

            <div class="discover-info">
                <h2>${place.name}</h2>
                <address>${place.address}</address>
                <p>${place.description}</p>
                <button>Learn More</button>
            </div>
        `;

            container.appendChild(card);
        });
    }

    /* VISITOR MESSAGE */
    const message = document.getElementById("visitor-message");

    if (message) {
        const lastVisit = localStorage.getItem("lastVisit");
        const now = Date.now();

        if (!lastVisit) {
            message.textContent = "Welcome! Let us know if you have any questions.";
        } else {
            const daysBetween = Math.floor((now - lastVisit) / 86400000);

            if (daysBetween < 1) {
                message.textContent = "Back so soon! Awesome!";
            } else if (daysBetween === 1) {
                message.textContent = "You last visited 1 day ago.";
            } else {
                message.textContent = `You last visited ${daysBetween} days ago.`;
            }
        }

        localStorage.setItem("lastVisit", now);
    }

    /* MODAL IN THE JOIN PAGE */
    document.querySelectorAll("[data-modal]").forEach(button => {
        button.addEventListener("click", () => {
            const modalId = button.dataset.modal;
            document.getElementById(modalId).showModal();
        });
    });

    document.querySelectorAll("dialog button").forEach(button => {
        button.addEventListener("click", () => {
            button.closest("dialog").close();
        });
    });

    /* HAMBURGER MENU ON SMALL SCREEN */
    const menuButton = document.querySelector("#menu");
    const nav = document.querySelector(".navigation");

    menuButton.addEventListener("click", () => {
        nav.classList.toggle("open");
    });

    // FOR THANK YOU PAGE
    const timestampField = document.getElementById("timestamp");

    if (timestampField) {
        const now = new Date();

        const date = now.toLocaleDateString();
        const time = now.toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
            hour12: false
        });

        timestampField.value = `${date} ${time}`;
    }

    const params = new URLSearchParams(window.location.search);

    const set = (id, value) => {
        const el = document.getElementById(id);
        if (el) el.textContent = value;
    };

    set("firstname", params.get("firstname"));
    set("lastname", params.get("lastname"));
    set("email", params.get("email"));
    set("phone", params.get("phone"));
    set("business", params.get("business"));
    set("timestamp", params.get("timestamp"));


    /* VISIBLE YEAR AND COPYRIGHT ON EACH PAGE */
    const yearSpan = document.querySelector("#currentYear");
    const lastModifiedSpan = document.querySelector("#lastModified");

    // Current copyright year
    const currentYear = new Date().getFullYear();
    yearSpan.textContent = currentYear;

    // Last modified date of the document
    lastModifiedSpan.textContent =
        `Last Modification: ${new Date(document.lastModified).toLocaleString()}`;

    /* WEATHER AND FORECAST ON THE HOME PAGE */
    const apiKey = "45703f9f2e9fb2f9c18782ef5b6a71f5";
    const latitude = 6.63;
    const longitude = 3.34;

    const currentTemp = document.querySelector('#current-temp');
    const weatherIcon = document.querySelector('#weather-icon');
    const captionDesc = document.querySelector('#weather-desc');

    const url = 'https://api.openweathermap.org/data/2.5/weather?lat=6.63&lon=3.34&units=imperial&appid=45703f9f2e9fb2f9c18782ef5b6a71f5';
    const forecastUrl = `https://api.openweathermap.org/data/2.5/forecast?lat=${latitude}&lon=${longitude}&units=imperial&appid=${apiKey}`;

    // CURRENT WEATHER
    async function apiFetch() {
        try {
            const response = await fetch(url);
            if (response.ok) {
                const data = await response.json();
                console.log(data);
                displayResults(data);
            } else {
                throw Error(await response.text());
            }

        } catch (error) {
            console.log(error);
        }
    }

    function displayResults(data) {
        currentTemp.innerHTML = `${data.main.temp}&deg;F`;
        const iconsrc = `https://openweathermap.org/img/w/${data.weather[0].icon}.png`;
        let desc = data.weather[0].description;
        weatherIcon.setAttribute('src', iconsrc);
        weatherIcon.setAttribute('alt', desc);
        captionDesc.textContent = `${desc}`;
    }

    apiFetch();

    async function getForecast() {
        try {
            const response = await fetch(forecastUrl);

            if (!response.ok) {
                throw Error(await response.text());
            }

            const data = await response.json();
            console.log(data);

            displayForecast(data);

        } catch (error) {
            console.log(error);
        }
    }

    function displayForecast(data) {
        const forecastContainer = document.querySelector("#forecast");
        forecastContainer.innerHTML = "";

        // OpenWeather gives 3-hour intervals → we pick 1 per day
        const dailyForecast = {};

        data.list.forEach(item => {
            const date = new Date(item.dt * 1000);
            const day = date.toLocaleDateString("en-US", { weekday: "short" });

            // keep only first entry per day
            if (!dailyForecast[day]) {
                dailyForecast[day] = item;
            }
        });

        // get first 3 days
        const days = Object.keys(dailyForecast).slice(0, 3);

        days.forEach(day => {
            const item = dailyForecast[day];

            const temp = Math.round(item.main.temp);
            const desc = item.weather[0].description;
            const icon = item.weather[0].icon;

            const card = document.createElement("div");
            card.classList.add("forecast-card");

            card.innerHTML = `
                <h3>${day}:</h3>
                <img src="https://openweathermap.org/img/wn/${icon}@2x.png" alt="${desc}">
                <p>${desc}</p>
                <p>${temp}°F</p>
            `;

            forecastContainer.appendChild(card);
        });
    }

    getForecast();

    /* 3 CARDS ON THE HOME PAGE  */
    async function loadSpotlights() {
        try {
            const container = document.getElementById("spotlight-container");

            if (!container) return;

            const response = await fetch("data/members.json");

            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }

            const data = await response.json();

            const members = data.members;

            // Gold (3) and Silver (2)
            let eligible = members.filter(member => {
                return member.membershipLevel === "2" ||
                    member.membershipLevel === "3" ||
                    member.membership_level === "2" ||
                    member.membership_level === "3";
            });

            // randomize
            eligible.sort(() => Math.random() - 0.5);

            // pick 3
            const selected = eligible.slice(0, 3);

            container.innerHTML = "";

            selected.forEach(member => {
                const card = document.createElement("div");
                card.classList.add("spotlight-card");

                const membership =
                    member.membershipLevel || member.membership_level;

                card.innerHTML = `
                <img src="${member.image}" alt="${member.name} logo">
                <h3>${member.name}</h3>
                <p><strong>Phone:</strong> ${member.phone}</p>
                <p><strong>Address:</strong> ${member.address}</p>
                <p><strong>Membership:</strong> ${membership === "3" ? "Gold" : "Silver"
                    }</p>
                <a href="${member.website}" target="_blank">
                    Visit Website
                </a>
            `;
                container.appendChild(card);
            });

        } catch (error) {
            console.error("Spotlight error:", error);
        }
    }
    loadSpotlights();

})