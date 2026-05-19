const quiz = document.getElementById('quiz')

renderQuestions(questions)
quiz.addEventListener('submit', checkAnswers)

function renderQuestions(questions) {
  quiz.innerHTML = questions.map(getQuestionHTML).join('<br>') + '<br><br>' + quiz.innerHTML
}

function getQuestionHTML(question) {
  let html = ''
  html += `<h2>${question.question}</h2>`
  html += question.options
    .map(
      (option) => `
    <label>
      <input
        type="${question.type === 'single' ? 'radio' : 'checkbox'}" 
        name="${question.question}"
        value="${option}"
      />
      ${option}
    </label>
  `,
    )
    .join('<br>')
  return html
}

function getUserAnswers(formData, questionText) {
  return formData.getAll(questionText)
}

function isAnswerCorrect(userAnswers, correctAnswers) {
  if (userAnswers.length !== correctAnswers.length) return false
  const sortedUser = [...userAnswers].sort()
  const sortedCorrect = [...correctAnswers].sort()
  return sortedUser.every((answer, i) => answer === sortedCorrect[i])
}

function checkAnswers(e) {
  e.preventDefault()

  const formData = new FormData(quiz)
  const results = questions.map((q) => {
    const userAnswers = getUserAnswers(formData, q.question)
    const correct = isAnswerCorrect(userAnswers, q.answers)
    return { question: q, userAnswers, correct }
  })

  renderResults(results)
}

function renderResults(results) {
  const correctCount = results.filter((r) => r.correct).length
  const total = results.length

  document.body.innerHTML = `
    <h1>Результаты квиза</h1>
    <p><strong>${correctCount}</strong> из <strong>${total}</strong> правильно</p>
    <ul>
      ${results
        .map(
          (r, i) => `
        <li>
          <h2>${i + 1}. ${r.question.question}</h2>
          <p>${r.correct ? '✓ Верно' : '✗ Неверно'}</p>
          <p>Ваш ответ: ${r.userAnswers.length ? r.userAnswers.join(', ') : '—'}</p>
          ${
            !r.correct
              ? `<p>Правильный ответ: ${r.question.answers.join(', ')}</p>`
              : ''
          }
        </li>
      `,
        )
        .join('')}
    </ul>
  `
}
