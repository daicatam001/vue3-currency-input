import inputHandle from "@/directive/input.handler";
import inputService from "@/directive/input.service";
import type { CurrencyInputConfig } from "@/directive/models";
import type { Ref } from "vue";

const onCreated = (el: HTMLInputElement, binding: Ref<CurrencyInputConfig>) => {
  inputService.initOptions(binding.value);
};

const onMount = (el: HTMLInputElement) => {
  el.style.textAlign = inputService.options.align;
  inputHandle.bindInput(el);
  
};

export default {
  created: onCreated,
  mounted: onMount,
};
