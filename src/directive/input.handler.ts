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
    this.inputEl.addEventListener("keypress", this.handleKeypress.bind(this));
    this.inputEl.addEventListener("paste", this.handlePaste.bind(this));
    this.inputEl.addEventListener("cut", this.handleCut.bind(this));
  }

  private handleKeyDown(event: KeyboardEvent) {
    this.updateInputState();
    const keyCode = event.which || event.charCode || event.keyCode;
    // Is backspace or delete
    if (keyCode === 8 || keyCode === 46) {
      event.preventDefault();
      this.removeChar(keyCode);
    }
  }

  private handleKeypress(event: KeyboardEvent) {
    this.assertInput();
    const keyCode = event.which || event.charCode || event.keyCode;
    event.preventDefault();
    this.addChar(keyCode);
  }

  private handlePaste(event: ClipboardEvent) {
    this.assertInput();
    this.updateInputState();
    let { selectionEnd, value } = this.state;

    // input get pasted value when timeout
    setTimeout(() => {
      this.assertInput();
      const newValue = this.inputEl.value;
      const selectionStart = selectionEnd + (newValue.length - value.length);
      this.updateInputValue(newValue, selectionStart);
    });
  }
  private handleCut(event: ClipboardEvent) {
    console.log(event);
  }

  private addChar(keyCode: number) {
    this.assertInput();
    const { selectionStart, selectionEnd, value } = this.state;
    const keyChar = String.fromCharCode(keyCode);
    if (!value) {
      this.updateInputValue(keyChar, keyChar.length);
    } else {
      // add new char to current selection
      const valueStart = value.substring(0, selectionStart);
      let valueEnd = value.substring(selectionEnd);
      const newValue = valueStart + keyChar + valueEnd;
      this.updateInputValue(newValue, selectionStart + 1);
    }
  }

  private removeChar(charCode: number) {
    let { selectionStart, selectionEnd, value } = this.state;
    if (selectionStart === selectionEnd) {
      // Is backspace
      if (charCode === 8) {
        // if remove decimal char
        if (!value.charAt(selectionStart - 1).match(/\d/)) {
          selectionStart--;
          selectionEnd--;
        }
        selectionStart--;
      }
      // Is delete
      else if (charCode === 46) {
        // if remove decimal char
        if (!value.charAt(selectionStart).match(/\d/)) {
          selectionStart++;
          selectionEnd++;
        }
        selectionEnd++;
      }
    }
    const newValue =
      value.substring(0, selectionStart) + value.substring(selectionEnd);
    this.updateInputValue(newValue, selectionStart);
  }

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
