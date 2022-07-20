import { CurrencyInputConfig, InputNumberElement, InputState } from "./models";
import { REGEX } from "./models";
export class InputHandler {
  inputEl: InputNumberElement;
  state: InputState = {
    selectionStart: 0,
    selectionEnd: 0,
    value: "",
  };
  options: CurrencyInputConfig = {
    align: "right",
    decimal: ".",
    precision: 2,
    thousands: ",",
    allowNull: true,
  };

  constructor(
    input: HTMLInputElement,
    options: Partial<CurrencyInputConfig> = {}
  ) {
    this.inputEl = input as InputNumberElement;
    this.setOptions(options);
    this.bindEvents();
  }

  setOptions(options: Partial<CurrencyInputConfig> = {}) {
    this.options = { ...this.options, ...options };
  }

  setNumberValue(value: number | null) {
    this.updateInputValue(
      typeof value === "number" ? value.toString() : "",
      0,
      false
    );
  }

  private bindEvents() {
    this.inputEl.addEventListener("keydown", this.handleKeyDown.bind(this));
    this.inputEl.addEventListener("keypress", this.handleKeypress.bind(this));
    this.inputEl.addEventListener("paste", this.handlePaste.bind(this));
    this.inputEl.addEventListener("cut", this.handleCut.bind(this));
    this.inputEl.setNumberValue = this.setNumberValue.bind(this);
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
    const keyCode = event.which || event.charCode || event.keyCode;
    event.preventDefault();
    this.addChar(keyCode);
  }

  private handlePaste(event: ClipboardEvent) {
    const paste = (event.clipboardData || window.clipboardData).getData("text");
    if (paste.match(REGEX.ALLOWED_INPUT_CHARACTERS)) {
      event.preventDefault();
      return;
    }
    this.updateInputState();
    let { selectionEnd, value } = this.state;

    // input get pasted value when timeout
    setTimeout(() => {
      const newValue = this.inputEl.value;
      const selectionStart = selectionEnd + (newValue.length - value.length);
      this.updateInputValue(newValue, selectionStart);
    });
  }
  private handleCut(event: ClipboardEvent) {
    this.updateInputState();
    let { selectionStart } = this.state;
    setTimeout(() => {
      const newValue = this.inputEl.value;
      this.updateInputValue(newValue, selectionStart);
    });
  }

  private addChar(keyCode: number) {
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

  private updateInputValue(
    currentValue: string,
    selectionStart: number,
    triggerEvent: boolean = true
  ) {
    const { thousands } = this.options;
    const { formattedValue, numberValue } = this.formatValue(
      currentValue,
      thousands
    );
    this.inputEl.value = formattedValue;
    if (triggerEvent) {
      selectionStart =
        selectionStart - (currentValue.length - formattedValue.length);
      this.setCursorAt(selectionStart);
      this.state.selectionStart = selectionStart;
      this.inputEl.dispatchEvent(
        new CustomEvent("number-change", {
          detail: {
            number: numberValue,
          },
        })
      );
    }
  }

  private updateInputState() {
    const { selectionStart, selectionEnd, value } = this.inputEl;
    this.state = {
      selectionStart: selectionStart || 0,
      selectionEnd: selectionEnd || 0,
      value,
    };
  }

  private setCursorAt(position: number) {
    this.inputEl.focus();
    this.inputEl.setSelectionRange(position, position);
  }

  formatValue(newValue: string, thousands: string) {
    const { allowNull } = this.options;
    if (newValue === "" && allowNull) {
      return { formattedValue: "", numberValue: null };
    }
    const numberValue = newValue.replace(REGEX.NUMBERS_ONLY, "");
    const formattedValue = numberValue.replace(
      REGEX.FORMATTED_NUMBERS,
      thousands
    );
    return { formattedValue, numberValue: +numberValue };
  }
}

export default InputHandler;
