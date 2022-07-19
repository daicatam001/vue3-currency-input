export interface CurrencyInputConfig {
  align: "right" | "left";
  allowNegative: boolean;
  decimal: string;
  precision: 2;
  prefix?: string;
  suffix?: string;
  thousands: string;
  nullable: boolean;
}

export interface InputState {
  selectionStart: number;
  selectionEnd: number;
  value: string;
}

export const REGEX = {
  NUMBERS_ONLY: /[^0-9]/g,
  FORMATTED_NUMBERS: /\B(?=([0-9]{3})+(?![0-9]))/g,
};
