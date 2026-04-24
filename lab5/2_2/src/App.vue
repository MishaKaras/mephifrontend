<script setup>
import Clicker from './components/Clicker.vue'

const handleClick = (n) => {
  alert(`Clicker ${n} clicked!`)
}

</script>

<template>
  <div id="app">
    <Clicker v-for="n in 100" :key="n" :amount="3" @button-clicked="() => handleClick(n)">
      <button>Clicker {{ n }}</button>
    </Clicker>
  </div>
</template>

<style scoped></style>
