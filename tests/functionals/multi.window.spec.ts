import { test, expect } from "@playwright/test";
import * as allure from "allure-js-commons";

test.describe("Multiple Windows Functionality:", { annotation: { type: "story", description: "Validate Multi-Window Handling" } }, () => {
  test("should handle multiple windows and navigate between them", { annotation: { type: "Window Switching", description: "Test to verify multiple windows handling" }, tag: "@multiwindow" }, async ({ context, page }, testInfo) => {
    await allure.feature("Multiple Windows");
    await allure.story("Window Switching");
    await allure.severity("high");

    // Step 1: Navigate to the-internet.herokuapp.com
    await page.goto("https://the-internet.herokuapp.com/");
    await expect.soft(page.locator("h1")).toContainText("Welcome to the-internet");
    const parentPageTitle = await page.title();
    console.log(`Parent window title: ${parentPageTitle}`);

    // Attach screenshot of parent window
    let parentWindowScreenshot = await page.screenshot({ fullPage: true });
    await testInfo.attach("Parent Window - Initial", {
      body: parentWindowScreenshot,
      contentType: "image/png",
    });

    // Step 2: Click on "Multiple Windows" link and wait for navigation
    const multiWindowsLink = page.getByRole("link", { name: "Multiple Windows" });
    await expect.soft(multiWindowsLink).toBeVisible();
    await multiWindowsLink.click();
    
    // Wait for the page to load
    await page.waitForLoadState("domcontentloaded");

    // Step 3: Verify we're on the multiple windows page
    const multiWindowPageTitle = await page.title();
    console.log(`Multiple Windows page title: ${multiWindowPageTitle}`);

    // Attach screenshot after clicking Multiple Windows link
    let multiWindowPageScreenshot = await page.screenshot({ fullPage: true });
    await testInfo.attach("Multiple Windows Page", {
      body: multiWindowPageScreenshot,
      contentType: "image/png",
    });

    // Step 4: Click the "click here" link to open a new window
    const clickHereLink = page.getByRole("link", { name: "Click Here" });
    await expect.soft(clickHereLink).toBeVisible();

    // Wait for new window/tab to open
    const [newWindow] = await Promise.all([
      context.waitForEvent("page"),
      clickHereLink.click(),
    ]);

    // Step 5: Navigate to that next window that is opened and assert the header text
    await newWindow.waitForLoadState("domcontentloaded");
    const newWindowTitle = await newWindow.title();
    console.log(`New window title: ${newWindowTitle}`);
    await expect.soft(newWindow.locator("body")).toBeVisible();

    // Attach screenshot of new window
    let newWindowScreenshot = await newWindow.screenshot({ fullPage: true });
    await testInfo.attach("New Window - Opened", {
      body: newWindowScreenshot,
      contentType: "image/png",
    });

    // Step 6: Come back to the parent window
    await page.bringToFront();
    const parentPageTitleAfterReturn = await page.title();
    console.log(`Back to parent window title: ${parentPageTitleAfterReturn}`);
    await expect.soft(page.locator("h1")).toContainText("Welcome to the-internet");

    // Attach final screenshot of parent window
    parentWindowScreenshot = await page.screenshot({ fullPage: true });
    await testInfo.attach("Parent Window - Final", {
      body: parentWindowScreenshot,
      contentType: "image/png",
    });

    console.log("✅ All windows handled successfully and returned to parent window");
  });
});
