<script setup>
import { ref } from 'vue'

const props = defineProps(['amount'])

const emit = defineEmits(['button-clicked'])

const count = ref(0)
const increment = () => { 
    count.value += props.amount ?? 1 
    emit('button-clicked')
}
</script>

<template>
  <div style="border: 1px solid #ccc; padding: 8px; display: inline-block; margin: 4px;">
    <div>Count: {{ count }}</div>
    <div @click="increment" style="display: inline-block; cursor: pointer;">
      <slot />
    </div>
  </div>
</template>