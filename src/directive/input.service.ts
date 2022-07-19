import { REGEX } from "./models";

export class InputService {
  formatValue(newValue: string, thousands: string) {
    const numberValue = newValue.replace(REGEX.NUMBERS_ONLY, "");
    const formattedNumberValue = numberValue.replace(
      REGEX.FORMATTED_NUMBERS,
      thousands
    );
    return formattedNumberValue;
  }
}

export default new InputService();
