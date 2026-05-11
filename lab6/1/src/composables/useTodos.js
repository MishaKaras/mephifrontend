import { ref, watch } from 'vue'
import { fetchTodos, createTodo, updateTodo, deleteTodo } from '../api/todosapi.js'

export function useTodos() {
    const todos = ref([])
    const loading = ref(false)
    const error = ref(null)

    const loadFromStorage = () => {
        const saved = localStorage.getItem('todos')
        if (saved) {
            todos.value = JSON.parse(saved)
        }
    }

    watch(todos, (newVal) => {
        localStorage.setItem('todos', JSON.stringify(newVal))
    }, { deep: true })

    const init = async () => {
        loadFromStorage()

        if (todos.value.length === 0) {
            loading.value = true
            try {
                const data = await fetchTodos()
                todos.value = data
            } catch (e) {
                error.value = e.message
            } finally {
                loading.value = false
            }
        }
    }

    const addTodo = async (title) => {
        if (!title.trim()) return

        loading.value = true
        error.value = null
        try {
            const newTodo = await createTodo(title.trim())
            todos.value.unshift({
                ...newTodo,
                id: Date.now(),
                isLocal: true
            })
        } catch (e) {
            error.value = e.message
        } finally {
            loading.value = false
        }
    }

    const toggleTodo = async (id) => {
        const todo = todos.value.find(t => t.id === id)
        if (!todo) return

        if (todo.isLocal) {
            todo.completed = !todo.completed
            return
        }

        loading.value = true
        error.value = null
        try {
            await updateTodo(id, !todo.completed)
            todo.completed = !todo.completed
        } catch (e) {
            error.value = e.message
        } finally {
            loading.value = false
        }
    }

    const removeTodo = async (id) => {
        const todo = todos.value.find(t => t.id === id)
        if (!todo) return

        if (todo.isLocal) {
            todos.value = todos.value.filter(t => t.id !== id)
            return
        }

        loading.value = true
        error.value = null
        try {
            await deleteTodo(id)
            todos.value = todos.value.filter(t => t.id !== id)
        } catch (e) {
            error.value = e.message
        } finally {
            loading.value = false
        }
    }

    return {
        todos,
        loading,
        error,
        init,
        addTodo,
        toggleTodo,
        removeTodo
    }
}