import { test } from "@playwright/test";
import chalk from "chalk";

type level = "log" | "info" | "warn" | "error";

export async function log(level: level, message: string) {
  const timestamp = new Date().toISOString();

  const plainLine = `[${timestamp}] [${level.toUpperCase()}] : ${message}`;
  let colorcodedLine = plainLine;

  switch (level) {
    case "info":
      colorcodedLine = chalk.blue(plainLine);
      break;
    case "warn":
      colorcodedLine = chalk.yellow(plainLine);
      break;
    case "error":
      colorcodedLine = chalk.red(plainLine);
      break;
    case "log":
      colorcodedLine = chalk.white(plainLine);
      break;
    default:
  }

  (console[level] || console.log)(colorcodedLine);
  await test.step(plainLine, async () => {});
}
