document.getElementById("scroll-btn").addEventListener("click", function () {
  const section = document.querySelector(".about-games");
  section.scrollIntoView({ behavior: "smooth" });
});
