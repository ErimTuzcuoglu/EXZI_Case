/* Instead of using 3rd party libs like winston, using default console. */
export default class Logger {
  static log(message = '', level = 'log') {
    const timestamp = new Date().toISOString();
    console[level](`[${timestamp}] [${message}]`);
  }

  static info(message) {
    this.log(message, 'info');
  }

  static warn(message) {
    this.log(message, 'warn');
  }

  static error(message) {
    this.log(message, 'error');
  }
};
