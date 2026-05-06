import { test as base } from "@playwright/test";

export type EnvConfig = {
  envName: string;
  appUrl: string;
  dbConfig: {};
  nopCommerceAppUrl: string;
  apiBaseUrl: string;
};

export const test = base.extend<EnvConfig>({
  envName: ["staging", { option: true }],
  appUrl: ["<provideURL>", { option: true }],
  dbConfig: [{}, { option: true }],
  nopCommerceAppUrl: ["<provideURL>", { option: true }],
  apiBaseUrl: ["<provideURL>", { option: true }]
});
