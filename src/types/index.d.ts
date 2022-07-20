declare global {
  interface Window {
    clipboardData: {
      getData: (s: string) => string;
    };
  }
}

declare namespace CurrencyInput {
  export type CurrencyInputElement = HTMLInputElement & {
    setNumberValue: (value: number | null) => void;
  };
  export type CurrencyInputChangeEvent = CustomEvent & {
    detail: {
      number: number;
    };
  };
}

export {};
