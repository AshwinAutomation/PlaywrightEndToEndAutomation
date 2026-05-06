import { defineConfig, devices } from "@playwright/test";
import { baseConfig } from "../playwright.config";
import { EnvConfig } from "../tests/helpers/config-fixures";
import path from "path";

export default defineConfig<EnvConfig>({
  ...baseConfig, // load the all existing configuration from the base config file
  testDir: path.resolve(process.cwd(), "./tests"),
  use: {
    ...baseConfig.use, // load the all existing configuration from the base config file
    envName: "staging",
    appUrl: "https://katalon-demo-cura.herokuapp.com/",
    nopCommerceAppUrl: "https://admin-demo.nopcommerce.com/login?returnUrl=%2Fadmin%2F",
    apiBaseUrl: "https://dummy.restapiexample.com/api/v1/employees",
    dbConfig: {
      server: "",
      dbName: "",
      connectionStr: "",
    },
  },
});
