import currencyInput from "@/directive/numeric-input";
import { createApp } from "vue";
import App from "@/demo/App.vue";
import VueHighlightJS from "vue3-highlightjs";
import "vue3-highlightjs/styles/solarized-light.css";
const app = createApp(App);
app.directive("numeric-input", currencyInput);
app.use(VueHighlightJS)
app.mount("#app");
