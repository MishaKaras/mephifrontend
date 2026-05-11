<template>
  <div class="todo-container">
    <h1 class="title">&#128221; ToDo List</h1>

    <div class="add-form">
      <input
        v-model="newTaskTitle"
        class="task-input"
        placeholder="Новая задача..."
        :disabled="loading"
        @keyup.enter="handleAdd"
      />
      <button
        class="add-btn"
        :disabled="loading || !newTaskTitle.trim()"
        @click="handleAdd"
      >
        {{ loading ? '...' : 'Добавить' }}
      </button>
    </div>

    <div v-if="error" class="error-msg">
      &#9888; {{ error }}
    </div>

    <ul v-if="todos.length" class="todo-list">
      <TodoItem
        v-for="todo in todos"
        :key="todo.id"
        :todo="todo"
        :loading="loading"
        @toggle="handleToggle"
        @delete="askDelete"
      />
    </ul>

    <div v-else-if="!loading" class="empty-state">
      Нет задач. Добавьте первую! &#127881;
    </div>

    <div v-if="todos.length" class="stats">
      Выполнено: {{ doneCount }} / {{ todos.length }}
    </div>

    <Popup
      :isOpen="showDeletePopup"
      @confirm="confirmDelete"
      @cancel="cancelDelete"
    >
      <div class="popup-content">
        <div class="popup-icon">&#9888;</div>
        <h2>Удалить задачу?</h2>
        <p>Это действие нельзя отменить</p>
      </div>
    </Popup>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import TodoItem from './TodoItem.vue'
import Popup from './Popup.vue'
import { useTodos } from '../composables/useTodos.js'

const { todos, loading, error, init, addTodo, toggleTodo, removeTodo } = useTodos()

const newTaskTitle = ref('')

const showDeletePopup = ref(false)
const todoIdToDelete = ref(null)

const doneCount = computed(() => todos.value.filter(t => t.completed).length)

const handleAdd = async () => {
  await addTodo(newTaskTitle.value)
  newTaskTitle.value = ''
}

const handleToggle = async (id) => {
  await toggleTodo(id)
}

const askDelete = (id) => {
  todoIdToDelete.value = id
  showDeletePopup.value = true
}

const confirmDelete = async () => {
  showDeletePopup.value = false
  if (todoIdToDelete.value !== null) {
    await removeTodo(todoIdToDelete.value)
    todoIdToDelete.value = null
  }
}

const cancelDelete = () => {
  showDeletePopup.value = false
  todoIdToDelete.value = null
}

onMounted(() => {
  init()
})
</script>

<style scoped>
.todo-container {
  max-width: 560px;
  margin: 48px auto;
  padding: 32px;
  background: white;
  border-radius: 16px;
  box-shadow: 0 4px 32px rgba(0, 0, 0, 0.1);
  font-family: 'Segoe UI', sans-serif;
}

.title {
  font-size: 26px;
  color: #1f2937;
  margin-bottom: 24px;
  text-align: center;
}

.add-form {
  display: flex;
  gap: 10px;
  margin-bottom: 20px;
}

.task-input {
  flex: 1;
  padding: 10px 14px;
  border: 2px solid #e5e7eb;
  border-radius: 8px;
  font-size: 15px;
  outline: none;
  transition: border-color 0.2s;
}

.task-input:focus {
  border-color: #6366f1;
}

.add-btn {
  padding: 10px 20px;
  background: #6366f1;
  color: white;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  font-size: 15px;
  transition: background 0.2s;
  white-space: nowrap;
}

.add-btn:hover:not(:disabled) { background: #4f46e5; }
.add-btn:disabled { background: #c7d2fe; cursor: not-allowed; }

.error-msg {
  background: #fee2e2;
  color: #dc2626;
  padding: 10px 14px;
  border-radius: 8px;
  margin-bottom: 16px;
  font-size: 14px;
}

.todo-list {
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.empty-state {
  text-align: center;
  color: #9ca3af;
  padding: 32px;
  font-size: 15px;
}

.stats {
  margin-top: 16px;
  text-align: right;
  font-size: 13px;
  color: #6b7280;
}

.popup-content {
  margin-bottom: 8px;
}

.popup-icon {
  font-size: 40px;
  margin-bottom: 12px;
}

.popup-content h2 {
  font-size: 20px;
  color: #1f2937;
  margin: 0 0 8px;
}

.popup-content p {
  font-size: 14px;
  color: #6b7280;
  margin: 0;
}
</style>