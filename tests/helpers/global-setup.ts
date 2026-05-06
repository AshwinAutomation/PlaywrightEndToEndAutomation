import { type FullConfig } from "@playwright/test";
import path from "node:path";
import fs from "fs";

export default async function globalSetup(config: FullConfig) {
  // delete allure result
  if (process.env.RUNNER?.toUpperCase() === "LOCAL") {
    const resultsDir = path.resolve(process.cwd(), "allure-results");
    console.log("resultsDir :", resultsDir);
    if (fs.existsSync(resultsDir)) {
      fs.rmSync(resultsDir, { recursive: true, force: true });
    }
  }

  process.env.LOGIN_COOKIES=undefined;
}


