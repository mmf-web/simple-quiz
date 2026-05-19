const QUIZ_SIZE = 10

function pickRandom(pool, count) {
  const shuffled = [...pool]
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]]
  }
  return shuffled.slice(0, count)
}

const questions = pickRandom(allQuestions, QUIZ_SIZE)

const quiz = document.getElementById('quiz')

renderQuestions(questions)
quiz.addEventListener('submit', checkAnswers)

function renderQuestions(questions) {
  const submitBtn = quiz.querySelector('button[type="submit"]')
  const questionsHTML = questions.map((q, i) => getQuestionHTML(q, i)).join('')
  submitBtn.insertAdjacentHTML('beforebegin', questionsHTML)
}

function getQuestionHTML(question, index) {
  const inputType = question.type === 'single' ? 'radio' : 'checkbox'
  const typeHint =
    question.type === 'single' ? 'Один ответ' : 'Несколько ответов'

  const optionsHTML = question.options
    .map(
      (option) => `
    <label
      class="group flex cursor-pointer items-start gap-3 rounded-xl border border-white/10 bg-white/5 px-4 py-3 transition hover:border-indigo-400/40 hover:bg-indigo-500/10 has-[:checked]:border-indigo-400/60 has-[:checked]:bg-indigo-500/15"
    >
      <input
        type="${inputType}"
        name="${question.question}"
        value="${option}"
        class="mt-1 h-4 w-4 shrink-0 border-white/20 bg-slate-800 text-indigo-500 focus:ring-indigo-400 focus:ring-offset-slate-900"
      />
      <span class="text-sm leading-relaxed text-slate-200 group-has-[:checked]:text-white sm:text-base">${option}</span>
    </label>
  `,
    )
    .join('')

  return `
    <article class="rounded-2xl border border-white/10 bg-white/5 p-5 shadow-xl shadow-black/20 backdrop-blur-sm sm:p-6">
      <div class="mb-4 flex flex-wrap items-center gap-2">
        <span class="rounded-lg bg-indigo-500/20 px-2.5 py-1 text-xs font-semibold text-indigo-300">
          ${index + 1}
        </span>
        <span class="rounded-lg border border-white/10 px-2.5 py-1 text-xs text-slate-400">
          ${typeHint}
        </span>
      </div>
      <h2 class="text-base font-semibold leading-snug text-white sm:text-lg">
        ${question.question}
      </h2>
      <div class="mt-4 flex flex-col gap-2">
        ${optionsHTML}
      </div>
    </article>
  `
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
  const percent = Math.round((correctCount / total) * 100)

  let scoreColor = 'text-rose-400'
  let scoreRing = 'stroke-rose-400'
  let scoreLabel = 'Попробуйте ещё раз'
  if (percent >= 80) {
    scoreColor = 'text-emerald-400'
    scoreRing = 'stroke-emerald-400'
    scoreLabel = 'Отлично!'
  } else if (percent >= 50) {
    scoreColor = 'text-amber-400'
    scoreRing = 'stroke-amber-400'
    scoreLabel = 'Неплохо'
  }

  const circumference = 2 * Math.PI * 52
  const dashOffset = circumference - (percent / 100) * circumference

  document.body.innerHTML = `
    <div class="pointer-events-none fixed inset-0 overflow-hidden" aria-hidden="true">
      <div class="absolute -left-32 top-0 h-96 w-96 rounded-full bg-indigo-500/20 blur-3xl"></div>
      <div class="absolute -right-32 bottom-0 h-96 w-96 rounded-full bg-violet-500/15 blur-3xl"></div>
    </div>

    <div class="relative mx-auto max-w-2xl px-4 py-10 sm:px-6 sm:py-16">
      <header class="mb-10 text-center">
        <p class="mb-3 text-sm font-medium uppercase tracking-wider text-slate-500">Результаты</p>
        <h1 class="text-3xl font-bold tracking-tight sm:text-4xl">Квиз завершён</h1>
      </header>

      <div class="mb-10 flex flex-col items-center rounded-2xl border border-white/10 bg-white/5 p-8 backdrop-blur-sm">
        <div class="relative h-36 w-36">
          <svg class="h-full w-full -rotate-90" viewBox="0 0 120 120">
            <circle cx="60" cy="60" r="52" fill="none" stroke="currentColor" stroke-width="8" class="text-white/10" />
            <circle
              cx="60" cy="60" r="52" fill="none" stroke-width="8"
              class="${scoreRing}"
              stroke-dasharray="${circumference}"
              stroke-dashoffset="${dashOffset}"
              stroke-linecap="round"
            />
          </svg>
          <div class="absolute inset-0 flex flex-col items-center justify-center">
            <span class="text-3xl font-bold ${scoreColor}">${percent}%</span>
            <span class="text-sm text-slate-400">${correctCount} / ${total}</span>
          </div>
        </div>
        <p class="mt-4 text-lg font-semibold ${scoreColor}">${scoreLabel}</p>
        <p class="mt-1 text-slate-400">
          <strong class="text-white">${correctCount}</strong> из <strong class="text-white">${total}</strong> ответов верны
        </p>
      </div>

      <ul class="space-y-4">
        ${results
          .map(
            (r, i) => `
          <li class="rounded-2xl border p-5 sm:p-6 ${
            r.correct
              ? 'border-emerald-500/30 bg-emerald-500/10'
              : 'border-rose-500/30 bg-rose-500/10'
          }">
            <div class="mb-3 flex flex-wrap items-center gap-2">
              <span class="rounded-lg px-2.5 py-1 text-xs font-semibold ${
                r.correct
                  ? 'bg-emerald-500/20 text-emerald-300'
                  : 'bg-rose-500/20 text-rose-300'
              }">
                ${r.correct ? '✓ Верно' : '✗ Неверно'}
              </span>
              <span class="text-xs text-slate-500">Вопрос ${i + 1}</span>
            </div>
            <h2 class="text-base font-semibold leading-snug text-white sm:text-lg">
              ${r.question.question}
            </h2>
            <p class="mt-3 text-sm text-slate-300">
              <span class="text-slate-500">Ваш ответ:</span>
              ${r.userAnswers.length ? r.userAnswers.join(', ') : '—'}
            </p>
            ${
              !r.correct
                ? `<p class="mt-2 text-sm text-emerald-300/90">
                    <span class="text-slate-500">Правильно:</span>
                    ${r.question.answers.join(', ')}
                  </p>`
                : ''
            }
          </li>
        `,
          )
          .join('')}
      </ul>

      <a
        href="."
        class="mt-10 flex w-full items-center justify-center rounded-xl border border-white/10 bg-white/5 px-6 py-4 text-base font-semibold text-white transition hover:border-indigo-400/40 hover:bg-indigo-500/10 focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:ring-offset-2 focus:ring-offset-slate-950"
      >
        Пройти снова
      </a>
    </div>
  `
}
