import { test, expect } from "@playwright/test";
import { log } from "../helpers/logger";
import { describe } from "node:test";
import HomePage from "../page-objects/nopcommerce.home.page";
import NopCommerceCustomersPage from "../page-objects/nopcommerce.customers.page";
import listofUsers from  "../../data/api-resp/list-of-users.json"



test.describe("NopCommerce Application E2E Tests validation of login functionality", () => {
  test.beforeEach(async ({ page }, testInfo) => {
    const envConfig = testInfo.project.use as any;
    const homePage = new HomePage(page);
    const url = await homePage.loginToNopCommerceApp(envConfig.nopCommerceAppUrl, process.env.NOP_COMMERCE_USER_NAME, process.env.NOP_COMMERCE_PASSWORD);
    await expect.soft(url).toContain("admin");
    await log("info", `Homepage loaded successfully`);
  });

  test("TC01: Verify customer search", async ({ page }, testInfo) => {
    //    const USER_DATA={
    //   firstName: listofUsers[0].first_name,
    //   lastName: listofUsers[0].last_name
    // }
    const customersPage = new NopCommerceCustomersPage(page);
    const isNoDataAvailable = await customersPage.validateCustomerSearch("dilu", "Doe");
    await expect.soft(isNoDataAvailable).toBe(true);
  });
});
