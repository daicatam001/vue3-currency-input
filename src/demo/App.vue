<template>
    <TheHeader />
    <div class="container">
        <BasicExample></BasicExample>
    </div>
</template>
<script setup>
import BasicExample from './BasicExample.vue';
import TheHeader from './TheHeader.vue';
</script>
<style>
html,
body {
    margin: 0;
    font-family: Avenir, Helvetica, Arial, sans-serif;
}

.container {

    max-width: 1200px;
    margin: 0 auto;
    padding: 30px;
}

.example {
    padding: 2rem 0;
}

.row {
    display: grid;
    gap: 2rem;
    grid-template-columns: repeat(5, 1fr);
}

.col-cmp {
    grid-column: span 3 / span 3;
}

.col-data {
    grid-column: span 2 / span 2;
}

pre {
    margin: 0;
}

h4 {
    margin-bottom: 10px;
}

header {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    background-color: aliceblue;
    padding: 50px 0;
}

.badges{
    display: flex;
    gap: 10px;
}

input {
    padding: 0.5rem 0.25rem;
    border-radius: 0.25rem;
}

button {
    background-color: cadetblue;
    border: 1px solid cadetblue;
    color: white;
    margin-left: 1rem;
    padding: 0.5rem 1rem;
    border-radius: 0.25rem;
    cursor: pointer;
}
</style>