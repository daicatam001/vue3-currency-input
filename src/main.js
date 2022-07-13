import { createApp } from "vue";
import App from "./demo/App.vue";
import CurrencyInput from "./components/CurrencyInput.vue";
const app = createApp(App);

app.component("CurrencyInput", CurrencyInput);

app.mount("#app");
