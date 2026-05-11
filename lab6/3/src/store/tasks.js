const STORAGE_KEY = 'vue-todo-tasks'

export function getTasks() {
    const raw = localStorage.getItem(STORAGE_KEY)
    return raw ? JSON.parse(raw) : []
}

export function saveTasks(tasks) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks))
}

export function getNextId() {
    const tasks = getTasks()
    if (tasks.length === 0) return 1
    return Math.max(...tasks.map(t => t.id)) + 1
}

export function addTask(title) {
    const tasks = getTasks()
    const newTask = {
        id: getNextId(),
        title,
        completed: false,
        createdAt: new Date().toISOString()
    }
    tasks.push(newTask)
    saveTasks(tasks)
    return newTask
}

export function deleteTask(id) {
    const tasks = getTasks().filter(t => t.id !== Number(id))
    saveTasks(tasks)
}

export function toggleTask(id) {
    const tasks = getTasks().map(t =>
        t.id === Number(id) ? { ...t, completed: !t.completed } : t
    )
    saveTasks(tasks)
}

export function getTaskById(id) {
    return getTasks().find(t => t.id === Number(id)) || null
}