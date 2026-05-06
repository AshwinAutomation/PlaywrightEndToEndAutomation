import { type FullConfig } from "@playwright/test";

import { exec } from "child_process";

export default async function globalTeardown(config: FullConfig) {
  // delete allure result
  if (process.env.RUNNER?.toUpperCase() === "LOCAL") {
    exec("allure serve", (error,stdout,stderr) => {
      if(error){
        console.log("ERROR:Starting allure serve: ", error.message);
      }
    });
  }
}

//export default globalSetup;
