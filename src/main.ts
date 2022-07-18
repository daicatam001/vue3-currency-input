import currencyInput from "@/directive/currency-input";
import { createApp } from "vue";
import App from "./demo/App.vue";

const app = createApp(App);
app.directive("currency-input", currencyInput);
app.mount("#app");
