<script setup>
import { onMounted } from 'vue'
import { useRoute, RouterLink } from 'vue-router'
import { toggleTask, getTaskById } from '../store/tasks.js'

const route = useRoute()

onMounted(() => {
    const task = getTaskById(route.params.id)
    if (task) {
        toggleTask(route.params.id)
    }
})
</script>

<template>
    <div class="message">
        <h2>&#128257; Task status has been changed</h2>
        <p>Статус задачи #{{ route.params.id }} обновлён.</p>
        <RouterLink :to="`/task/${route.params.id}`">&#10229; К задаче</RouterLink>
        <br /><br />
        <RouterLink to="/">&#10229; К списку</RouterLink>
    </div>
</template>

<style scoped>
.message {
    text-align: center;
    margin-top: 60px;
    font-family: sans-serif;
}

.message h2 { font-size: 28px; color: #276749; }
.message p  { color: #718096; margin: 10px 0 20px; }
.message a  { color: #3182ce; text-decoration: none; font-size: 15px; }
</style>