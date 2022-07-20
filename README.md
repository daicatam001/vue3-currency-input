
# vue3-numeric-input

A simple Vue 3 directive that helps show number of input in numeric format

### Note
Currently directive only works with integer number. Supporting float number is comming soon.
## Demo

Comming soon.
  <!-- - [Example page](https://vue3-typeahdead-input.vercel.app/) -->


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

...Or import vue3-typeahead-input component locally in component you want. 

```ts
import NumericInput from 'vue3-numeric-input';

export default {
    name: 'YourComponentName',
    directives: {
        'numeric-input': NumericInput
    }
}
```
Use component in template
```html
<template>
    <div>
        <input type="text"
            v-numeric-input
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

