import { test, expect } from "@playwright/test";
import * as allure from "allure-js-commons";
import constantData from "../../data/constants.json";
import { json } from "node:stream/consumers";
import testdata from "../../data/test-data";

test.describe("Login Functionality:", { annotation: { type: "story", description: "Jira-1234 - Validate Authentication" } }, () => {
  test.beforeEach("Navigate to Login page:", async ({ page }, testInfo) => {
    //get the app url from config file
    const envConfig = testInfo.project.use as any;
    await page.goto(envConfig.appUrl);
    await expect.soft(page).toHaveTitle("CURA Healthcare Service");
    await expect.soft(page.locator("h1")).toHaveText("CURA Healthcare Service");
    await page.getByRole("link", { name: "Make Appointment" }).click();
  });

  test("should login successfully", { annotation: { type: "Happypath - valid login scenario", description: "Test to verify successful" }, tag: "@smoke" }, async ({ page }, testInfo) => {
    //successful login
    await allure.feature("Authentication with valid credentials");
    await allure.story("Valid Login");
    await allure.severity("critical");
    await page.getByLabel("Username").fill(process.env.STAGGING_USER_NAME);
    await page.getByLabel("Password").fill(process.env.STAGGING_PASSWORD);
    await page.getByRole("button", { name: "Login" }).click();
    await expect.soft(page.locator("#appointment")).toContainText("Make Appointment");
    const fullpageScreenshot = await page.screenshot({ fullPage: true });
    await testInfo.attach("Successful Login Screenshot", {
      body: fullpageScreenshot,
      contentType: "image/png",
    });
    //console.log(`Login successful:${JSON.stringify(testInfo.config)}`);
  });

  test("should not login with Invalid", { annotation: { type: "Sadpath-invalid login scenario", description: "Test to verify failed" }, tag: "@sanity" }, async ({ page }, testInfo) => {
    //unsuccessful login
    await allure.feature("Authentication with invalid credentials");
    await allure.story("invalid Login");
    await allure.severity("critical");
    await page.getByLabel("Username").fill("John Doe");
    await page.getByLabel("Password").fill("test123");
    await page.getByRole("button", { name: "Login" }).click();
    await expect.soft(page.locator("#appointment")).toContainText("Make Appointment");
    const fullpageScreenshot = await page.screenshot({ fullPage: true });
    await testInfo.attach("Unsuccessful Login Screenshot", { body: fullpageScreenshot, contentType: "image/png" });
  });

  test("validate constant data", () => {
    console.log(`validate json data from constant file:",${JSON.stringify(constantData.STATUSCODE)} `);
  });

  test("TC_0001: should login successfully", { annotation: { type: "Happypath - valid login scenario", description: "Test to verify successful" }, tag: "@smoke" }, async ({ page }, testInfo) => {
    //successful login
    await allure.feature("Make Appointment");
    await allure.story("Valid Login");
    await allure.severity("critical");
    await page.getByLabel("Username").fill("John Doe");
    await page.getByLabel("Password").fill("ThisIsNotAPassword");
    await page.getByRole("button", { name: "Login" }).click();
    await expect.soft(page.locator("#appointment")).toContainText("Make Appointment");
    //select options from facility dropdown
    const facilityDropdown = page.getByRole("combobox", { name: "Facility" });
    await facilityDropdown.selectOption("Hongkong CURA Healthcare Center");
    //select checkbox
    const applyForHospitalReadmissionInput = page.getByLabel("Apply for hospital readmission");
    await applyForHospitalReadmissionInput.check();
    //select Radio button
    const medicaidText = page.getByText("Medicaid", { exact: true });
    await medicaidText.check();
    //visit date
    await page.getByLabel("Visit Date (Required)").click();
    await page.getByLabel("Visit Date (Required)").fill("10/03/2026");
    await page.getByLabel("Visit Date (Required)").press("Enter");
    //comment
    const commentField = page.getByRole("textbox", { name: "Comment" });
    await commentField.click();
    await commentField.fill("text input test\this is a multiline comment");
    // book appointment
    const bookAppointmentButton = page.getByRole("button", { name: "Book Appointment" });
    await bookAppointmentButton.click();
    const fullpageScreenshot = await page.screenshot({ fullPage: true });
    await testInfo.attach("Appointment Booked successfully", { body: fullpageScreenshot, contentType: "image/png" });
  });
});
