<script setup>
import { computed } from 'vue'
import { useRoute, RouterLink } from 'vue-router'
import { storeToRefs } from 'pinia'
import { useTasksStore } from '../stores/tasksStore.js'

const route = useRoute()
const store = useTasksStore()
const { getTaskById } = storeToRefs(store)

const task = computed(() => getTaskById.value(route.params.id))
</script>

<template>
    <div v-if="task">
        <h1>Задача #{{ task.id }}</h1>
        <div class="card">
            <p><strong>Название:</strong> {{ task.title }}</p>
            <p>
                <strong>Статус:</strong>
                <span :class="task.completed ? 'status-done' : 'status-pending'">
                {{ task.completed ? '✅ Выполнена' : '⏳ В процессе' }}
                </span>
            </p>
            <p><strong>Создана:</strong> {{ new Date(task.createdAt).toLocaleString() }}</p>
        </div>
        <div class="actions">
            <RouterLink :to="`/task/${task.id}/complete`">
                {{ task.completed ? '↩ Вернуть в работу' : '✅ Отметить выполненной' }}
            </RouterLink>
            <RouterLink :to="`/task/${task.id}/delete`" class="link-delete">&#128465; Удалить</RouterLink>
            <RouterLink to="/">&#10229; Назад к списку</RouterLink>
        </div>
    </div>
    <div v-else class="not-found">
        <h2>Задача не найдена</h2>
        <RouterLink to="/">&#10229; На главную</RouterLink>
    </div>
</template>

<style scoped>
.card {
    background: #f7fafc;
    border: 1px solid #e2e8f0;
    border-radius: 8px;
    padding: 16px 20px;
    margin: 16px 0;
    line-height: 2;
}

.status-done    { color: #276749; font-weight: 600; }
.status-pending { color: #c05621; font-weight: 600; }

.actions { display: flex; flex-direction: column; gap: 10px; }
.actions a { color: #3182ce; text-decoration: none; font-size: 14px; }
.link-delete { color: #c53030 !important; }

.not-found { text-align: center; margin-top: 60px; }
</style>