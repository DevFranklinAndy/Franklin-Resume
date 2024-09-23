// Mobile Navigation Menu
const btnMenu = document.querySelector(".mobile-menu-btn");
const headerEl = document.querySelector(".header");

btnMenu.addEventListener("click", function () {
  headerEl.classList.toggle("menu-open");
});

// Sticky Header

const sectionHeroEl = document.querySelector(".section-hero");
const obs = new IntersectionObserver(
  function (entries) {
    const entry = entries[0];

    if (!entry.isIntersecting) document.body.classList.add("sticky");
    if (entry.isIntersecting) document.body.classList.remove("sticky");
  },
  {
    root: null,
    threshold: 0,
    rootMargin: "-94px",
  }
);

obs.observe(sectionHeroEl);

// Smooth Scroll Into View

const navLinks = document.querySelectorAll(".header a:link");

navLinks.forEach(function (link) {
  link.addEventListener("click", function (e) {
    e.preventDefault();

    const href = link.getAttribute("href");

    // Scroll to Top
    if (href === "#") window.scroll({ behavior: "smooth", top: 0 });

    // Scroll to other sections
    if (href !== "#" && href.startsWith("#"))
      document.querySelector(href).scrollIntoView({ behavior: "smooth" });

    // // Hide the mobile navigation menu
    if (link.classList.contains("nav-link"))
      headerEl.classList.toggle("menu-open");
  });
});

// Set Current Year Automatically
const currentYear = new Date().getFullYear();

document.querySelector(".year").textContent = currentYear;

// Reveal Sections.

const allSections = document.querySelectorAll("section");

const revealSection = function (entries, observer) {
  const [entry] = entries;
  console.log(entry);

  if (!entry.isIntersecting) return;

  entry.target.classList.remove("section--hidden");
  observer.unobserve(entry.target);
};

const sectionObserver = new IntersectionObserver(revealSection, {
  root: null,
  threshold: 0.15,
});

allSections.forEach((section) => {
  sectionObserver.observe(section);
  // section.classList.add("section--hidden");
});

// Scroll to the top when page reloads.
window.history.scrollRestoration = "manual"; // Disable automatic scroll restoration
window.addEventListener("load", function () {
  window.scrollTo(0, 0); // Ensure the page scrolls to the top
});
