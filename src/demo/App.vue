<script setup>
const onNumberChange = (event) => {
  console.log(event)
}
</script>

<template>
  <input type="text" v-currency-input @number-change="onNumberChange">
  <br>
  <br>
  <input type="text" v-currency-input @number-change="onNumberChange">
</template>

<style scoped>
#app {
  padding: 20px;
}
</style>
