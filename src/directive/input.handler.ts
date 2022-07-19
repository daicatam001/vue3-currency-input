import inputService from "./input.service";
import { CurrencyInputConfig, InputState } from "./models";
export class InputHandler {
  inputEl: HTMLInputElement | null = null;
  state: InputState = {
    selectionStart: 0,
    selectionEnd: 0,
    value: "",
  };
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

  constructor(
    input: HTMLInputElement,
    options: Partial<CurrencyInputConfig> = {}
  ) {
    this.inputEl = input;
    this.options = { ...this.options, ...options };
    this.bindEvents();
  }

  private assertInput(): asserts this is this & {
    inputEl: HTMLInputElement;
  } {
    if (!this.inputEl) {
      throw new Error("input element not found");
    }
  }

  private bindEvents() {
    this.assertInput();
    this.inputEl.addEventListener("keydown", this.handleKeyDown.bind(this));
    // this.inputEl.addEventListener("focus", this.handleFocus.bind(this));
    this.inputEl.addEventListener("keypress", this.handleKeypress.bind(this));
    // this.inputEl.addEventListener("input", this.handleInput.bind(this));
  }

  private handleFocus(event: FocusEvent) {}

  private handleKeyDown(event: KeyboardEvent) {
    this.updateInputState();
    const keyCode = event.which || event.charCode || event.keyCode;
    // Is backspace or delete
    if (keyCode === 8 || keyCode === 46) {
      this.removeChar(keyCode);
    }
  }

  private handleKeypress(event: KeyboardEvent) {
    this.assertInput();
    const keyCode = event.which || event.charCode || event.keyCode;
    event.preventDefault();
    this.addChar(keyCode);
  }

  private addChar(keyCode: number) {
    this.assertInput();
    const keyChar = String.fromCharCode(keyCode);
    if (!this.state.value) {
      this.updateInputValue(keyChar, keyChar.length);
    } else {
      // add new char to current selection
      const valueStart = this.state.value.substring(
        0,
        this.state.selectionStart
      );
      let valueEnd = this.state.value.substring(this.state.selectionEnd);
      let newValue = valueStart + keyChar + valueEnd;
      this.updateInputValue(newValue, this.state.selectionStart + 1);
    }
  }

  private removeChar(charCode: number) {}

  private updateInputValue(tempValue: string, selectionStart: number) {
    this.assertInput();
    const { thousands } = this.options;
    const formattedValue = inputService.formatValue(tempValue, thousands);
    this.inputEl.value = formattedValue;
    selectionStart =
      selectionStart - (tempValue.length - formattedValue.length);
    this.setCursorAt(selectionStart);
  }

  private updateInputState() {
    this.assertInput();
    const { selectionStart, selectionEnd, value } = this.inputEl;
    this.state = {
      selectionStart: selectionStart || 0,
      selectionEnd: selectionEnd || 0,
      value,
    };
  }

  private setCursorAt(position: number) {
    this.assertInput();
    this.inputEl.focus();
    this.inputEl.setSelectionRange(position, position);
  }
}

export default InputHandler;
