<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useTasksStore } from '../stores/tasksStore.js'

const store = useTasksStore()
const router = useRouter()
const title = ref('')
const error = ref('')

function handleSubmit() {
    if (!title.value.trim()) {
        error.value = 'Название задачи не может быть пустым'
        return
    }
    store.addTask(title.value.trim())
    router.push('/')
}
</script>

<template>
    <h1>Новая задача</h1>
    <div class="form">
        <input v-model="title" placeholder="Название задачи..." @keyup.enter="handleSubmit" />
        <span v-if="error" class="error">{{ error }}</span>
        <button @click="handleSubmit">Добавить</button>
    </div>
</template>

<style scoped>
.form { 
    display: flex; 
    flex-direction: column; 
    gap: 10px; 
    max-width: 400px; 
}

input {
    padding: 10px 14px;
    border: 2px solid #cbd5e0;
    border-radius: 6px;
    font-size: 15px;
    outline: none;
}

input:focus { border-color: #4299e1; }

.error { color: #e53e3e; font-size: 13px; }

button {
    padding: 10px;
    background: #4299e1;
    color: white;
    border: none;
    border-radius: 6px;
    cursor: pointer;
    font-size: 15px;
    font-weight: 600;
}

button:hover { background: #3182ce; }
</style>