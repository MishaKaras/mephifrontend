<template>
  <Teleport to="body">
    <div v-if="isOpen" class="popup-overlay" @click.self="$emit('cancel')">
      <div class="popup-box">
        <slot />

        <div class="popup-actions">
          <button class="btn-cancel" @click="$emit('cancel')">
            Отмена
          </button>
          <button class="btn-confirm" @click="$emit('confirm')">
            Подтвердить
          </button>
        </div>
      </div>
    </div>
  </Teleport>
</template>

<script setup>
defineProps({
  isOpen: {
    type: Boolean,
    required: true
  }
})

defineEmits(['confirm', 'cancel'])
</script>

<style scoped>
.popup-overlay {
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
}

.popup-box {
  background: white;
  border-radius: 12px;
  padding: 32px;
  width: 360px;
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
  text-align: center;
}

.popup-actions {
  display: flex;
  gap: 12px;
  justify-content: center;
  margin-top: 24px;
}

.btn-cancel {
  padding: 10px 24px;
  border-radius: 8px;
  border: none;
  background: #e5e7eb;
  color: #374151;
  cursor: pointer;
  font-size: 14px;
}

.btn-confirm {
  padding: 10px 24px;
  border-radius: 8px;
  border: none;
  background: #ef4444;
  color: white;
  cursor: pointer;
  font-size: 14px;
}

.btn-cancel:hover { background: #d1d5db; }
.btn-confirm:hover { background: #dc2626; }
</style>