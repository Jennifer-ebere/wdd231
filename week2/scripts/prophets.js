const url = 'https://byui-cse.github.io/cse-ww-program/data/latter-day-prophets.json';
const cards = document.querySelector('#cards');

async function getProphetData() {
  const response = await fetch(url);
  const data = await response.json();
  // console.table(data);
  displayProphets(data.prophets);
}

// Define a function expression named "displayProphets" that handles a single parameter named "prophets".
const displayProphets = (prophets) => {
  prophets.forEach((prophet) => {
    // Create a section element and store it in a variable named "card".
    let card = document.createElement('section');
    let fullName = document.createElement('h2');
    let portrait = document.createElement('img');
    let dob = document.createElement('p');
    let pob = document.createElement('p');

    // Populate the heading element with the prophet's full name using a template string to build the full name.
    fullName.textContent = `${prophet.name} ${prophet.lastname}`;
    dob.textContent = `Date of birth: ${prophet.birthdate}`;
    pob.textContent = `Place of birth: ${prophet.birthplace}`;
    
    // Build the image element by setting the attributes.
    portrait.setAttribute('src', prophet.imageurl);
    portrait.setAttribute('alt', `Portrait of ${prophet.name} ${prophet.lastname}`);
    portrait.setAttribute('loading', 'lazy');
    portrait.setAttribute('width', '340'); // Set the width attribute (example value).
    portrait.setAttribute('height', '440'); // Set the height attribute (example value).

    // Append the fullName and portrait elements to the card.
    card.appendChild(fullName);
    card.appendChild(dob);
    card.appendChild(pob);
    card.appendChild(portrait);

    // Append the section card to the "cards" div.
    cards.appendChild(card);
  }); // end of arrow function and forEach loop
}

getProphetData();