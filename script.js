const WHATSAPP = "554896575420";
document.querySelectorAll(".js-wa").forEach(a => {
  a.href = "https://wa.me/" + WHATSAPP + "?text=" + encodeURIComponent(a.dataset.msg || "Olá! Quero alugar uma moto.");
  a.target = "_blank";
  a.rel = "noopener";
});
document.getElementById("ano").textContent = new Date().getFullYear();

const flt = document.querySelector(".wa-float");
new IntersectionObserver(([e]) => flt.classList.toggle("hide", e.isIntersecting))
  .observe(document.querySelector(".hero-cta"));
