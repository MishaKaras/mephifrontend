<script setup>
import { onMounted } from 'vue'
import { useRoute, RouterLink } from 'vue-router'
import { deleteTask, getTaskById } from '../store/tasks.js'

const route = useRoute()

onMounted(() => {
    const task = getTaskById(route.params.id)
    if (task) {
        deleteTask(route.params.id)
    }
})
</script>

<template>
    <div class="message">
        <h2>&#128465; Task deleted</h2>
        <p>Задача #{{ route.params.id }} была удалена.</p>
        <RouterLink to="/">&#10229; Вернуться к списку</RouterLink>
    </div>
</template>

<style scoped>
.message {
    text-align: center;
    margin-top: 60px;
    font-family: sans-serif;
}

.message h2 { font-size: 28px; color: #c53030; }
.message p  { color: #718096; margin: 10px 0 20px; }
.message a  { color: #3182ce; text-decoration: none; font-size: 15px; }
</style>