import InputHandler from "./input.handler";
import type { NumericInputConfig } from "./types";
import { Ref } from "vue";

const handlerMap = new WeakMap();

const onCreated = (el: HTMLInputElement, binding: Ref<NumericInputConfig>) => {
  const inputHandler = new InputHandler(el, binding.value);
  handlerMap.set(el, inputHandler);
};

const onMount = (el: HTMLInputElement) => {
  const inputHandler = handlerMap.get(el);
  el.style.textAlign = inputHandler.options.align;
};

const onUpdated = (el: HTMLInputElement, binding: Ref<NumericInputConfig>) => {
  const inputHandler = handlerMap.get(el);
  inputHandler.setOptions(binding.value);
};

const onUnmounted = (el: HTMLInputElement) => {
  handlerMap.delete(el);
};

export default {
  created: onCreated,
  mounted: onMount,
  updated: onUpdated,
  unmouned: onUnmounted,
};
