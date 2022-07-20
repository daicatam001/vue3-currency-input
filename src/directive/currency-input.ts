import InputHandler from "@/directive/input.handler";
import type { CurrencyInputConfig } from "@/directive/types";
import type { Ref } from "vue";

const handlerMap = new WeakMap();

const onCreated = (
  el: HTMLInputElement,
  binding: Ref<CurrencyInputConfig>,
) => {
  const inputHandler = new InputHandler(el, binding.value);
  handlerMap.set(el, inputHandler);
};

const onMount = (el: HTMLInputElement) => {
  const inputHandler = handlerMap.get(el);
  el.style.textAlign = inputHandler.options.align;
};

const onUpdated = (el: HTMLInputElement, binding: Ref<CurrencyInputConfig>) => {
  const inputHandler = handlerMap.get(el);
  inputHandler.setOptions(binding.value);
};

export default {
  created: onCreated,
  mounted: onMount,
  updated: onUpdated,
};
