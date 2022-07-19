export interface CurrencyInputConfig {
  align: "right" | "left";
  decimal: string;
  precision: number;
  thousands: string;
  allowNull: boolean;
}

export interface InputState {
  selectionStart: number;
  selectionEnd: number;
  value: string;
}

export const REGEX = {
  NUMBERS_ONLY: /[^0-9]/g,
  ALLOWED_INPUT_CHARACTERS: /[^0-9\,]/g,
  FORMATTED_NUMBERS: /\B(?=([0-9]{3})+(?![0-9]))/g,
};
