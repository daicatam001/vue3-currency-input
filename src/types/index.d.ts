declare global {
  interface Window {
    clipboardData: {
      getData: (s: string) => string;
    };
  }
}
export {};
