const questions = [
  {
    question: 'Что возвращает `[1, 2, 3].slice(1, 2)`?',
    options: ['[2]', '[2, 3]', '[1, 2]', '[1]'],
    answers: ['[2]'],
    type: 'single',
  },
  {
    question: 'Какие из следующих методов массива изменяют исходный массив?',
    options: ['push()', 'map()', 'splice()', 'filter()'],
    answers: ['push()', 'splice()'],
    type: 'multiple',
  },
  {
    question: 'Что возвращает `Array.prototype.push()`?',
    options: ['Добавленный элемент', 'Новую длину массива', 'undefined', 'Новый массив'],
    answers: ['Новую длину массива'],
    type: 'single',
  },
  {
    question: 'Какой результат у выражения `[10, 20, 30].find((x) => x > 15)`?',
    options: ['20', '1', 'true', 'undefined'],
    answers: ['20'],
    type: 'single',
  },
  {
    question: 'Что возвращает `Object.keys({ a: 1, b: 2 })`?',
    options: ['["a", "b"]', '{ a: 1, b: 2 }', '2', '["1", "2"]'],
    answers: ['["a", "b"]'],
    type: 'single',
  },
  {
    question: 'Какие из следующих выражений создают поверхностную копию объекта `obj`?',
    options: ['{ ...obj }', 'Object.assign({}, obj)', 'JSON.parse(JSON.stringify(obj))', 'obj'],
    answers: ['{ ...obj }', 'Object.assign({}, obj)'],
    type: 'multiple',
  },
  {
    question: 'Чему равно выражение `"toString" in ({})`?',
    options: ['true', 'false', 'undefined', 'выбрасывает ошибку'],
    answers: ['true'],
    type: 'single',
  },
  {
    question: 'Какое выражение проверяет, что у объекта `obj` есть собственное свойство `"x"` (не унаследованное)?',
    options: ['Object.hasOwn(obj, "x")', 'obj.hasOwnProperty("x")', '"x" in obj', 'obj.x !== undefined'],
    answers: ['Object.hasOwn(obj, "x")'],
    type: 'single',
  },
  {
    question: 'Что возвращает `[1, 2, 3].map((x) => x * 2)`?',
    options: ['[2, 4, 6]', '[1, 2, 3]', '[1, 4, 9]', '6'],
    answers: ['[2, 4, 6]'],
    type: 'single',
  },
  {
    question: 'После `const { a, b: renamed } = { a: 1, b: 2 }` каковы значения `a` и `renamed`?',
    options: ['a = 1, renamed = 2', 'a = 2, renamed = 1', 'a = undefined, renamed = 2', 'выбрасывает SyntaxError'],
    answers: ['a = 1, renamed = 2'],
    type: 'single',
  },
]
