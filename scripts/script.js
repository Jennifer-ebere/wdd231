document.getElementById("footerText").innerHTML =
  `&copy; ${new Date().getFullYear()} &bull; Jennifer Ebere &#127802; &bull; Lagos, Nigeria`;

document.getElementById("lastModified").textContent =
  `Last Modified: ${document.lastModified}`;

// RESPONSIVE MENU
const menuBtn = document.getElementById("menuBtn");
const navMenu = document.getElementById("navMenu");

menuBtn.addEventListener("click", () => {
  navMenu.classList.toggle("open");
});

// COURSE ELEMENTS
const courseContainer = document.getElementById("courseContainer");
const creditTotal = document.getElementById("creditTotal");

const allBtn = document.getElementById("allBtn");
const cseBtn = document.getElementById("cseBtn");
const wddBtn = document.getElementById("wddBtn");

// DISPLAY COURSES
function displayCourses(courseList) {

  // Clear existing content
  courseContainer.innerHTML = "";

  // Create cards dynamically
  courseList.forEach(course => {

    const card = document.createElement("div");

    card.classList.add("course-card");

    // Style completed courses differently
    if (course.completed) {
      card.classList.add("completed");
    }
    card.innerHTML = `
  ${course.completed ? "✔️ " : ""}
  ${course.subject} ${course.number}
`;

    courseContainer.appendChild(card);
  });

  // TOTAL CREDITS USING REDUCE
  const total = courseList.reduce((sum, course) => {
    return sum + course.credits;
  }, 0);
  creditTotal.textContent =
    `The total credits for the courses listed above is ${total}`;
}

// FILTER BUTTONS
allBtn.addEventListener("click", () => {
  displayCourses(courses);
});

wddBtn.addEventListener("click", () => {

  const wddCourses = courses.filter(course =>
    course.subject === "WDD"
  );

  displayCourses(wddCourses);
});

cseBtn.addEventListener("click", () => {

  const cseCourses = courses.filter(course =>
    course.subject === "CSE"
  );

  displayCourses(cseCourses);
});

// INITIAL PAGE LOAD
const initialCourses = courses.filter(course =>
  course.subject === "WDD"
);

displayCourses(initialCourses);