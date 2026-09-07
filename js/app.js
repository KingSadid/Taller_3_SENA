/* Entrada principal: pinta primero, observa después. */

function initPageModules() {
  // Solo activa lo que exista en esta página.
  if (document.querySelector("#reasonsMount")) renderReasons();
  if (document.querySelector("#communityMount")) renderCommunities();
  connectLab();
  if (document.querySelector("#quizMount")) initQuiz();
  rememberAuthorName();
  connectStaticCopyButtons();
}

function initApp() {
  // El contenido antes que el observador: si no, lo dinámico queda invisible.
  initEffects();
  initPageModules();
  initNavigation();
}

document.addEventListener("DOMContentLoaded", initApp);
