<script setup>
import { RouterLink } from 'vue-router'
import { storeToRefs } from 'pinia'
import { useTasksStore } from '../stores/tasksStore.js'

const store = useTasksStore()

const { tasks, completedCount, totalCount } = storeToRefs(store)

const { deleteTask, toggleTask } = store
</script>

<template>
    <h1>Список задач</h1>

    <p class="stats">Выполнено: {{ completedCount }} / {{ totalCount }}</p>

    <p v-if="tasks.length === 0" class="empty">
        Задач пока нет. <RouterLink to="/add">Добавить?</RouterLink>
    </p>

    <ul v-else class="task-list">
        <li v-for="task in tasks" :key="task.id" class="task-item">

            <span :class="['task-title', { done: task.completed }]">
                {{ task.title }}
            </span>

            <div class="task-actions">
                <RouterLink :to="`/task/${task.id}`">&#128065; Открыть</RouterLink>
                <button @click="toggleTask(task.id)">
                {{ task.completed ? '↩ Вернуть' : '✅ Выполнено' }}
                </button>
                <button class="btn-delete" @click="deleteTask(task.id)">&#128465; Удалить</button>
            </div>

        </li>
    </ul>
</template>

<style scoped>
.stats { 
    color: #718096; 
    font-size: 14px; 
    margin-bottom: 16px; 
}

.empty { color: #718096; }

.task-list { 
    list-style: none; 
    padding: 0; 
    display: flex; 
    flex-direction: column; 
    gap: 12px; 
}

.task-item {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 12px 16px;
    border: 1px solid #e2e8f0;
    border-radius: 8px;
    background: #f7fafc;
}

.task-title { font-size: 15px; }

.task-title.done { text-decoration: line-through; color: #a0aec0; }

.task-actions { 
    display: flex; 
    gap: 8px; 
    align-items: center; 
}

.task-actions a { 
    font-size: 13px; 
    color: #3182ce; 
    text-decoration: none; 
}

button {
    padding: 5px 10px; 
    border: none; 
    border-radius: 5px;
    cursor: pointer; 
    font-size: 13px;
    background: #ebf8ff; 
    color: #2b6cb0;
}

.btn-delete { background: #fff5f5; color: #c53030; }
</style>