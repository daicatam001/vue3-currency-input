<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { NumericInputChangeEvent, NumericInputElement } from '../directive/types';

const model = ref(1234)

const onNumberChange = (event: NumericInputChangeEvent) => {
    model.value = event.detail.number
}
const inputNumber = ref<NumericInputElement | null>(null)
const genRandomValue = () => {
    model.value = Math.floor(Math.random() * 99999999) + 1
    inputNumber.value!.setNumberValue(model.value)
}

onMounted(() => {
    inputNumber.value!.setNumberValue(model.value)
})
</script>
<template>
    <h3>Usage</h3>
    <div class="row">
        <div class="col-cmp">
            <pre v-highlightjs>
                <code class="javascript">
    &lt;template&gt;
        &lt;input 
            v-numeric-input=&quot;{
                thousands: &#39;,&#39;,
                align: &#39;right&#39;,
                nullable: true
            }&quot;
            ref=&quot;inputNumber&quot;
            @number-change=&quot;onNumberChange&quot;&gt;
        &lt;button @click=&quot;genRandomValue&quot;&gt;Change value&lt;/button&gt;
    &lt;/template&gt;
    &lt;script setup lang=&quot;ts&quot;&gt;
    import { ref, onMounted } from &#39;vue&#39;
    import type { NumericInputChangeEvent, NumericInputElement } from &#39;vue3-numeric-input&#39;;

    const model = ref(1234);
    const inputNumber = ref&lt;NumericInputElement | null&gt;(null);

    onMounted(() =&gt; {
        inputNumber.value!.setNumberValue(model.value)
    })

    const onNumberChange = (event: NumericInputChangeEvent) =&gt; {
        model.value = event.detail.number
    }

    const genRandomValue = () =&gt; {
        model.value = Math.floor(Math.random() * 99999999) + 1
        inputNumber.value!.setNumberValue(model.value)
    }
    &lt;/script&gt;
                </code>
            </pre>
        </div>
        <div class="col-data">
            <div>
                <input 
                    v-numeric-input="{
                        thousands: ',',
                        align: 'right',
                        nullable: true
                    }"
                    ref="inputNumber"
                    @number-change="onNumberChange">
                <button @click="genRandomValue">Change value</button>
            </div>
            <h4>Model:</h4>
            <pre v-highlightjs><code class="javascript">{{ model }}</code></pre>
        </div>
    </div>
</template>