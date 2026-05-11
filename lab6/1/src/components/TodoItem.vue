<template>
  <li class="todo-item" :class="{ completed: todo.completed }">
    <label class="todo-label">
      <input
        type="checkbox"
        :checked="todo.completed"
        :disabled="loading"
        @change="$emit('toggle', todo.id)"
      />
      <span class="todo-title">{{ todo.title }}</span>
    </label>

    <button
      class="delete-btn"
      :disabled="loading"
      @click="$emit('delete', todo.id)"
      title="Удалить"
    >
      &#128465;
    </button>
  </li>
</template>

<script setup>
defineProps({
  todo: {
    type: Object,
    required: true
  },
  loading: {
    type: Boolean,
    default: false
  }
})

defineEmits(['toggle', 'delete'])
</script>

<style scoped>
.todo-item {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 14px 16px;
  border-radius: 8px;
  background: #f9fafb;
  transition: background 0.2s;
}

.todo-item:hover {
  background: #f3f4f6;
}

.todo-item.completed .todo-title {
  text-decoration: line-through;
  color: #9ca3af;
}

.todo-label {
  display: flex;
  align-items: center;
  gap: 12px;
  cursor: pointer;
  flex: 1;
}

.todo-label input[type="checkbox"] {
  width: 18px;
  height: 18px;
  cursor: pointer;
  accent-color: #6366f1;
}

.todo-title {
  font-size: 15px;
  color: #374151;
}

.delete-btn {
  background: none;
  border: none;
  cursor: pointer;
  font-size: 18px;
  padding: 4px 8px;
  border-radius: 6px;
  transition: background 0.2s;
  opacity: 0.6;
}

.delete-btn:hover {
  background: #fee2e2;
  opacity: 1;
}

.delete-btn:disabled {
  cursor: not-allowed;
  opacity: 0.3;
}
</style>