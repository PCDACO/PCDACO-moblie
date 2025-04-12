declare module 'xdate' {
  export default class XDate extends Date {
    toString(format?: string): string;
  }
}
