import chalk, { ColorName, colorNames } from 'chalk';
import convert from 'color-convert';

const DEFAULTS = {
  verbose: false,
  silent: true,
};

export class Logger {
  actor: string;
  color: string;

  static setDefaults(silent: boolean, verbose: boolean): void {
    DEFAULTS.silent = silent;
    DEFAULTS.verbose = verbose;
  }

  constructor(actor = '', color = 'white') {
    this.actor = actor;
    this.color = color;
  }

  info(msg: string): void {
    if (!DEFAULTS.verbose) return;
    this.log(msg, '️  ', 'white');
  }

  success(msg: string): void {
    this.log(msg, '✅', 'green');
  }

  warn(msg: string, error?: Error): void {
    this.log(msg, '⚠️ ', 'yellow');
    if (error) console.error(error);
  }

  error(msg: string, error?: Error): void {
    this.log(msg, '🚨', 'red' );
    if (error) console.error(error);
  }

  log(msg: string, emoji: string, color: ColorName = 'white'): void {
    if (DEFAULTS.silent) return;
    let formattedMessage = chalk.hex(convert.keyword.hex(color as any))(`${emoji}  ${msg}`);
    
    if (DEFAULTS.verbose) {
      const formattedPrefix = chalk.hex(convert.keyword.hex(color as any))(`[${this.actor}]`);
      formattedMessage = `${formattedPrefix} ${formattedMessage}`;
    }
    console.error(formattedMessage);
  }
}

export default new Logger();
