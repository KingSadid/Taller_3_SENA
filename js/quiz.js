/* Quiz de autoevaluación del criterio: utilidad de las funciones PHP. */

function quizQuestion(item, index) {
  // Construye una pregunta con sus opciones.
  const block = document.createElement("div");
  block.className = "quiz-q";
  block.innerHTML = `<h4>${index + 1}. ${item.q}</h4>` + item.options
    .map((text, i) => `<label><input type="radio" name="q${index}" value="${i}"> ${text}</label>`)
    .join("");
  return block;
}

function gradeQuiz() {
  // Califica y celebra el resultado.
  const total = QUIZ.length;
  let score = 0;
  QUIZ.forEach((item, i) => {
    const picked = document.querySelector(`input[name="q${i}"]:checked`);
    if (picked && Number(picked.value) === item.answer) score++;
  });
  const result = document.querySelector("#quizResult");
  result.textContent = score === total
    ? `★ ${score}/${total} — Criterio logrado: reconoces la utilidad de las funciones PHP. ¡Listo para socializar!`
    : `☆ ${score}/${total} — Repasa las razones ${score < 2 ? "I–III" : "IV–VII"} y vuelve a intentarlo.`;
}

function initQuiz() {
  // Pinta el quiz y conecta el botón de calificar.
  const mount = document.querySelector("#quizMount");
  QUIZ.forEach((item, i) => mount.appendChild(quizQuestion(item, i)));
  document.querySelector("#quizGrade").addEventListener("click", gradeQuiz);
}
