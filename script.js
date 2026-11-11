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

const GA_ID = "";
const CLARITY_ID = "";
const CHAVE_COOKIES = "luiz_cookies";

function lerEscolha() {
  try { return localStorage.getItem(CHAVE_COOKIES); } catch { return null; }
}

function salvarEscolha(valor) {
  try { localStorage.setItem(CHAVE_COOKIES, valor); } catch {}
}

function carregarScript(src) {
  const s = document.createElement("script");
  s.async = true;
  s.src = src;
  document.head.appendChild(s);
}

function iniciarAnalytics() {
  if (GA_ID) {
    window.dataLayer = window.dataLayer || [];
    window.gtag = function () { dataLayer.push(arguments); };
    gtag("js", new Date());
    gtag("config", GA_ID, { anonymize_ip: true });
    carregarScript("https://www.googletagmanager.com/gtag/js?id=" + GA_ID);
  }
  if (CLARITY_ID) {
    window.clarity = window.clarity || function () { (window.clarity.q = window.clarity.q || []).push(arguments); };
    carregarScript("https://www.clarity.ms/tag/" + CLARITY_ID);
  }
}

document.querySelectorAll(".js-wa").forEach(a => {
  a.addEventListener("click", () => {
    if (window.gtag) gtag("event", "clique_whatsapp", { origem: a.dataset.msg || "" });
  });
});

if (GA_ID || CLARITY_ID) {
  const escolha = lerEscolha();
  if (escolha === "aceito") {
    iniciarAnalytics();
  } else if (!escolha) {
    const aviso = document.createElement("div");
    aviso.className = "cookies";
    aviso.setAttribute("role", "dialog");
    aviso.setAttribute("aria-label", "Aviso de cookies");
    aviso.innerHTML = '<p>Usamos cookies pra entender como o site é usado e melhorar a tua visita.</p><div><button type="button" data-escolha="recusado" class="cookies-nao">Recusar</button><button type="button" data-escolha="aceito" class="cookies-sim">Aceitar</button></div>';
    aviso.addEventListener("click", e => {
      const valor = e.target.dataset && e.target.dataset.escolha;
      if (!valor) return;
      salvarEscolha(valor);
      aviso.remove();
      if (valor === "aceito") iniciarAnalytics();
    });
    document.body.appendChild(aviso);
  }
}
