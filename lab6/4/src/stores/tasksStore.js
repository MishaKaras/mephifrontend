import { ref, computed } from 'vue'
import { defineStore } from 'pinia'

const STORAGE_KEY = 'vue-todo-tasks'

export const useTasksStore = defineStore('tasks', () => {
    const tasks = ref(
        JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]')
    )

    const getTaskById = computed(() => {
        return (id) => tasks.value.find(t => t.id === Number(id)) || null
    })

    const completedCount = computed(
        () => tasks.value.filter(t => t.completed).length
    )

    const totalCount = computed(() => tasks.value.length)

    
    function persist() {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks.value))
    }

    function addTask(title) {
        const maxId = tasks.value.length > 0
        ? Math.max(...tasks.value.map(t => t.id))
        : 0

        tasks.value.push({
            id: maxId + 1,
            title,
            completed: false,
            createdAt: new Date().toISOString()
        })

        persist()
    }

    function deleteTask(id) {
        tasks.value = tasks.value.filter(t => t.id !== Number(id))
        persist()
    }

    function toggleTask(id) {
        const task = tasks.value.find(t => t.id === Number(id))
        if (task) {
            task.completed = !task.completed
            persist()
        }
    }

    return {
        tasks,
        getTaskById,
        completedCount,
        totalCount,
        addTask,
        deleteTask,
        toggleTask
    }
})