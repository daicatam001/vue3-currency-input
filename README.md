
# vue3-currency-input

A simple Vue 3 directive that helps show number of input in currency format

### Note
Currently directive only works with integer number. Supporting float number is comming soon.
## Demo

Comming soon.
  <!-- - [Example page](https://vue3-typeahdead-input.vercel.app/) -->


## Installation

Using npm
```
npm install vue3-currency-input
```

Using yarn
```
yarn add vue3-currency-input
```

## Usage
Import vue3-currency-input directive globally.

```ts
import App from './App.vue';
import CurrencyInput from 'vue3-currency-input';

let app = createApp(App)
app.directive('currency-input', CurrencyInput)
app.mount('#app')
```

...Or import vue3-typeahead-input component locally in component you want. 

```ts
import CurrencyInput from 'vue3-currency-input';

export default {
    name: 'YourComponentName',
    directives: {
        'currency-input': CurrencyInput
    }
}
```
Use component in template
```html
<template>
    <div>
        <input type="text"
            v-currency-input
            @number-change="onNumberChange">
    </div>
</template>

<script setup lang="ts">
    const onNumberChange = (event: CustomEvent)=>{
        const { number } = event.detail 
    }
</script>

```

## Properties

| Property  | Type | Description | Default |
|---|---|---|---|
| align | String | Text alignment in input (left \| right) | right |
| thousands | string | Separator of thousands | , |
| nullable | boolean | when true, the value of the clean field will be `null`, when false the value will be `0` | false |



## Events

| Name | Description |
| ---- | ----------- |
| @number-change | Emitted number value of input throughout `CustomEvent`: `event.detail.number` |

