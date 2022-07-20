import currencyInput from "@/directive/numeric-input";
import { createApp } from "vue";
import App from "@/demo/App.vue";

const app = createApp(App);
app.directive("numeric-input", currencyInput);
app.mount("#app");
