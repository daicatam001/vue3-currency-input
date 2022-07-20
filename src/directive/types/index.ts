declare global {
  interface Window {
    clipboardData: {
      getData: (s: string) => string;
    };
  }
}

export interface InputState {
  selectionStart: number;
  selectionEnd: number;
  value: string;
  number?: number | null;
}
export interface CurrencyInputConfig {
  align: "right" | "left";
  decimal: string;
  precision: number;
  thousands: string;
  allowNull: boolean;
}
export declare type CurrencyInputElement = HTMLInputElement & {
  setNumberValue: (value: number | null) => void;
};
export declare type CurrencyInputChangeEvent = CustomEvent & {
  detail: {
    number: number;
  };
};

