document.getElementById("toggle-button").addEventListener("click", function () {
  const navLinks = document.getElementById("nav-links");
  const navbar = document.getElementById("navbar");
  const mainContent = document.querySelector(".main-content");
  const profile = document.querySelector(".profile-img");

  // Toggle active class for both nav-links and navbar
  navLinks.classList.toggle("active");
  navbar.classList.toggle("active");
  mainContent.classList.toggle("active");
  profile.classList.toggle("active");
});
