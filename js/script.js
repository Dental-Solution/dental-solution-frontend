/* Navegação compartilhada por todas as páginas. */
(function () {
  "use strict";

  const menuButton = document.querySelector("[data-menu-toggle]");
  const navigation = document.querySelector("[data-site-nav]");
  if (!menuButton || !navigation) return;

  // Sem esta classe, o CSS mantém os links visíveis mesmo sem JavaScript.
  document.documentElement.classList.add("js");

  function setMenuOpen(isOpen) {
    navigation.classList.toggle("is-open", isOpen);
    menuButton.setAttribute("aria-expanded", String(isOpen));
    menuButton.setAttribute("aria-label", isOpen ? "Fechar menu principal" : "Abrir menu principal");
  }

  menuButton.addEventListener("click", function () {
    setMenuOpen(menuButton.getAttribute("aria-expanded") !== "true");
  });

  navigation.querySelectorAll("a").forEach(function (link) {
    link.addEventListener("click", function () {
      setMenuOpen(false);
    });
  });

  document.addEventListener("keydown", function (event) {
    if (event.key === "Escape" && menuButton.getAttribute("aria-expanded") === "true") {
      setMenuOpen(false);
      menuButton.focus();
    }
  });

  // Evita reabrir um estado antigo ao alternar entre desktop e celular.
  window.matchMedia("(max-width: 991px)").addEventListener("change", function () {
    setMenuOpen(false);
  });
})();
