import type { InputState } from "./models";

export class InputHandler {
  inputEl: HTMLInputElement | null = null;
  state: InputState = { selectionStart: 0, selectionEnd: 0, value: "" };

  bindInput(input: HTMLInputElement) {
    this.inputEl = input;
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
    // this.inputEl.addEventListener("keydown", this.handleKeyDown);
    this.inputEl.addEventListener("focus", this.handleFocus.bind(this));
    this.inputEl.addEventListener("keypress", this.handleKeypress.bind(this));
    this.inputEl.addEventListener("input", this.handleInput.bind(this));
  }

  private handleFocus(event: FocusEvent) {}

  private handleKeyDown(event: KeyboardEvent) {
    this.assertInput();
    const keyCode = event.which || event.charCode || event.keyCode;
  }

  private handleKeypress(event: KeyboardEvent) {
    this.assertInput();
    const keyCode = event.which || event.charCode || event.keyCode;
    event.preventDefault();
    this.addChar(keyCode);
  }

  private handleInput(event: Event) {
    this.assertInput();
    // const keyCode = event.which || event.charCode || event.keyCode;
    // console.log(this.inputEl.value);
  }

  private addChar(keyCode: number) {
    this.assertInput();
    const keyChar = String.fromCharCode(keyCode);
    this.setstate();
    if (!this.state.value) {
      this.inputEl.value = keyChar;
      this.setCursorAt(this.inputEl.value.length);
    } else {
      const valueStart = this.state.value.substring(
        0,
        this.state.selectionStart
      );
      let valueEnd = this.state.value.substring(this.state.selectionEnd);
      this.inputEl.value = valueStart + keyChar + valueEnd;
      this.setCursorAt(this.state.selectionStart + 1);
    }
  }

  private setstate() {
    this.assertInput();
    const { selectionStart, selectionEnd, value } = this.inputEl;
    this.state = {
      selectionStart: selectionStart || 0,
      selectionEnd: selectionEnd || 0,
      value,
    };
    console.log(this.state);
  }

  private setCursorAt(position: number) {
    this.assertInput();
    this.inputEl.focus();
    this.inputEl.setSelectionRange(position, position);
  }
}

export default new InputHandler();
