<script setup lang="ts">
import { ref, onMounted } from 'vue'
const inputValue = ref(1234)
const onNumberChange = (event: CurrencyInputChangeEvent) => {
  const { number } = event.detail
  inputValue.value = number
}
const inputNumber = ref<CurrencyInputElement | null>(null)
const renNumber = () => {
  inputValue.value = Math.floor(Math.random() * 2000) + 1
}

onMounted(() => {
  inputNumber.value!.setNumberValue(inputValue.value)
})
</script>
<template>
  <!-- <input v-currency-input
    @number-change="onNumberChange">
  <br> -->
  <br>
  <input v-currency-input
    ref="inputNumber"
    @number-change="onNumberChange">
  <button @click="renNumber">click</button>
</template>

<style scoped>
#app {
  padding: 20px;
}
</style>
