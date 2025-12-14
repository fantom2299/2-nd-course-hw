document.getElementById("scroll-btn").addEventListener("click", function () {
  const section = document.querySelector(".about-games");
  section.scrollIntoView({ behavior: "smooth" });
});

////

function goToGame(url) {
  window.location.href = url;
}

