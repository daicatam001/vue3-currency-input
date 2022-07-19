import InputHandler from "@/directive/input.handler";
import inputService from "@/directive/input.service";
import type { CurrencyInputConfig } from "@/directive/models";
import type { Ref } from "vue";

const handlerMap = new WeakMap();

const onCreated = (el: HTMLInputElement, binding: Ref<CurrencyInputConfig>) => {
  const inputHandler = new InputHandler(el, binding.value);
  handlerMap.set(el, inputHandler);
};

const onMount = (el: HTMLInputElement) => {
  const inputHandler = handlerMap.get(el);
  el.style.textAlign = inputHandler.options.align;
};

export default {
  created: onCreated,
  mounted: onMount,
};
