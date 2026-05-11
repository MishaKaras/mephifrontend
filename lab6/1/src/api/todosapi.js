const BASE_URL = 'https://jsonplaceholder.typicode.com'
const USER_ID = 1  

export async function fetchTodos() {
  const res = await fetch(`${BASE_URL}/todos?userId=${USER_ID}&_limit=5`)
  if (!res.ok) throw new Error('Ошибка загрузки задач')
  return res.json()
}

export async function createTodo(title) {
  const res = await fetch(`${BASE_URL}/todos`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ title, completed: false, userId: USER_ID })
  })
  if (!res.ok) throw new Error('Ошибка создания задачи')
  return res.json()
}

export async function updateTodo(id, completed) {
  const res = await fetch(`${BASE_URL}/todos/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ id, completed, userId: USER_ID })
  })
  if (!res.ok) throw new Error('Ошибка обновления задачи')
  return res.json()
}

export async function deleteTodo(id) {
  const res = await fetch(`${BASE_URL}/todos/${id}`, {
    method: 'DELETE'
  })
  if (!res.ok) throw new Error('Ошибка удаления задачи')
  return true
}
