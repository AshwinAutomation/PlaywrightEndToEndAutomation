  import { test, expect } from "@playwright/test";
  import * as allure from "allure-js-commons";
  import testdata from "../../data/test-data";
  import { log } from "../helpers/logger";

  const makeAppointment = testdata.makeAppointmentTestData();

  for (const appointmentdata of makeAppointment) {
    test.describe("Make Appointment:", { annotation: { type: "story", description: "Jira-1234 - Validate Authentication" } }, () => {
      test.beforeEach("Navigate to Login page:", async ({ page }, testInfo) => {
        const envConfig = testInfo.project.use as any;
        //custom logger
        await log("log", `EnviorntName ${envConfig.envName}`);
        await page.goto(envConfig.appUrl);
        await expect.soft(page).toHaveTitle("CURA Healthcare Service");
        await expect.soft(page.locator("h1")).toHaveText("CURA Healthcare Service");
        await page.getByRole("link", { name: "Make Appointment" }).click();
        await page.getByLabel("Username").fill(process.env.STAGGING_USER_NAME);
        await page.getByLabel("Password").fill(process.env.STAGGING_PASSWORD);
        await page.getByRole("button", { name: "Login" }).click();
        await log("info", "Login successful");
        //get login cookies
        const loginCookies = await page.context().cookies();
        process.env.LOGIN_COOKIE = JSON.stringify(loginCookies);
        await expect.soft(page.locator("#appointment")).toContainText("Make Appointment");
      });

      test(`${appointmentdata.testId}:Make appointment`, { annotation: { type: "Booking appointment", description: "validate booking with multiple users" }, tag: "@smoke" }, async ({ page }, testInfo) => {
        //successful login
        await allure.feature("Make Appointment");
        await allure.story("Valid Login");
        await allure.severity("critical");
        //select options from facility dropdown
        const facilityDropdown = page.getByRole("combobox", { name: "Facility" });
        await facilityDropdown.selectOption(appointmentdata.facility);
        //select checkbox
        const applyForHospitalReadmissionInput = page.getByLabel("Apply for hospital readmission");
        await applyForHospitalReadmissionInput.check();
        //select Radio button
        const medicaidText = page.getByText(appointmentdata.hcp, { exact: true });
        await medicaidText.check();
        //visit date
        await page.getByLabel("Visit Date (Required)").click();
        await page.getByLabel("Visit Date (Required)").fill(appointmentdata.visitDt);
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
  }
