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
export interface NumericInputConfig {
  align: "right" | "left";
  decimal: string;
  precision: number;
  thousands: string;
  allowNull: boolean;
}
export declare type NumericInputElement = HTMLInputElement & {
  setNumberValue: (value: number | null) => void;
};
export declare type NumericInputChangeEvent = CustomEvent & {
  detail: {
    number: number;
  };
};

