import type { CurrencyInputConfig } from "./models";

export class InputService {

  options: CurrencyInputConfig = {
    align: "right",
    allowNegative: true,
    decimal: ".",
    precision: 2,
    prefix: "$ ",
    suffix: "",
    thousands: ",",
    nullable: false,
  };

  initOptions(options: Partial<CurrencyInputConfig> = {}): void {
    this.options = { ...this.options, ...options };
  }
}

export default new InputService();
