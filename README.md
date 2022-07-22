
# vue3-numeric-input

A simple Vue 3 directive that helps value of input in numeric format

### Note
Currently directive only works with integer numbers. Supporting float numbers is comming soon.
## Demo
  - [Example page](https://vue3-numeric-input.vercel.app/)

## Installation

Using npm
```
npm install vue3-numeric-input
```

Using yarn
```
yarn add vue3-numeric-input
```

## Usage
Import vue3-numeric-input directive globally.

```ts
import App from './App.vue';
import NumericInput from 'vue3-numeric-input';

let app = createApp(App)
app.directive('numeric-input', NumericInput)
app.mount('#app')
```

...Or import vue3-typeahead-input directive locally in component you want. 

```ts
import NumericInput from 'vue3-numeric-input';

export default {
    name: 'YourComponentName',
    directives: {
        'numeric-input': NumericInput
    }
}
```
Usage example
```html
<template>
    <input
        v-numeric-input="{
            thousands: ',',
            align: 'right',
            nullable: true
        }"
        ref="inputNumber"
        @number-change="onNumberChange" />
    <button @click="changeModel">Change value</button>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import type { NumericInputChangeEvent, NumericInputElement } from 'vue3-numeric-input';

const model = ref(1234) // input model
const inputNumber = ref<NumericInputElement | null>(null) // input ref

// update model when user interact input
const onNumberChange = (event: NumericInputChangeEvent) => {
    const { number } = event.detail
    model.value = number
}

// update input when model change
const changeModel = () => {
    /*
    TODO: update model value
    */

    inputNumber.value!.setNumberValue(model.value)
}

// init input with model value
onMounted(() => {
    inputNumber.value!.setNumberValue(model.value)
})
</script>

```

## Properties

| Property  | Type | Description | Default |
|---|---|---|---|
| align | String | Text alignment in input (left \| right) | right |
| thousands | string | Separator of thousands | , |
| nullable | boolean | when true, the value of the clean field will be `null`, when false the value will be `0` | true |



## Events

| Name | Description |
| ---- | ----------- |
| @number-change | Emitted number value of input throughout `CustomEvent`: `event.detail.number` |

## Custom function for input

| Name | Description |
| ---- | ----------- |
| setNumberValue | set value for input that will be display in numeric format |