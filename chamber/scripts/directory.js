document.addEventListener("DOMContentLoaded", () => {
  const url = "data/members.json";

  async function getMembersData() {
    try {
      const response = await fetch(url);
      const data = await response.json();
      console.log(data); // Check the fetched data in console
      displayMembers(data.members);
    } catch (error) {
      console.error('Error fetching member data:', error);
    }
  }

  const gridViewButton = document.querySelector('#grid-view');
  const listViewButton = document.querySelector('#list-view');
  const membersCard = document.querySelector('#membersCard');

  // Set default view to grid-view
  membersCard.classList.add("grid-view");

  gridViewButton.addEventListener("click", () => {
    membersCard.classList.add("grid-view");
    membersCard.classList.remove("list-view");
  });

  listViewButton.addEventListener("click", showList);

  function showList() {
    membersCard.classList.add("list-view");
    membersCard.classList.remove("grid-view");
  }

  const displayMembers = (members) => {
  membersCard.innerHTML = "";

  members.forEach((member, index) => {
    const section = document.createElement("div");
    section.classList.add("member-card");

    if (index % 2 === 0) {
      section.classList.add("even");
    } else {
      section.classList.add("odd");
    }

    const logo = document.createElement("img");
    const name = document.createElement("h3");
    const address = document.createElement("p");
    const phone = document.createElement("p");
    const links = document.createElement("a");
    const membership = document.createElement("p");

    // image
    logo.src = member.image;
    logo.loading = "lazy";
    logo.alt = `${member.name} logo`;
    logo.width = 250;
    logo.height = 250;
    

    // text fields
    name.textContent = member.name;
    address.textContent = member.address;
    phone.textContent = member.phone;

    links.href = member.website;
    links.textContent = member.website;
    links.target = "_blank";

    // ✅ FIX: handle BOTH naming styles safely
    const level = Number(member.membershipLevel || member.membership_level);

    let status = "";
    if (level === 3) {
      status = "Gold Member 🥇";
    } else if (level === 2) {
      status = "Silver Member 🥈";
    } else {
      status = "Member 🏅";
    }

    membership.textContent = status;

    // append elements
    section.appendChild(logo);
    section.appendChild(name);
    section.appendChild(address);
    section.appendChild(phone);
    section.appendChild(membership);
    section.appendChild(links);

    membersCard.appendChild(section);
  });
};

  getMembersData();

  const menuButton = document.querySelector("#menu");
  const nav = document.querySelector(".navigation");

  menuButton.addEventListener("click", () => {
  nav.classList.toggle("open");
  });

const yearSpan = document.querySelector("#currentYear");
const lastModifiedSpan = document.querySelector("#lastModified");

// Current copyright year
const currentYear = new Date().getFullYear();
yearSpan.textContent = currentYear;

// Last modified date of the document
lastModifiedSpan.textContent =
  `Last Modification: ${new Date(document.lastModified).toLocaleString()}`;
});