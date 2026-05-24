// spec: tests/cura-healthcare.plan.md
// seed: tests/seed.spec.ts

import { test, expect } from '@playwright/test';
import * as allure from 'allure-js-commons';

test.describe('Login Functionality', () => {
  test.beforeEach('Navigate to login page', async ({ page }) => {
    await page.goto('https://katalon-demo-cura.herokuapp.com/profile.php#login');
    await expect(page).toHaveTitle('CURA Healthcare Service');
  });

  test.describe('Positive Test Cases', () => {
    test('TC001: Successful Login with Valid Credentials', {
      annotation: { type: 'Happypath', description: 'Verify successful login with valid credentials' },
      tag: '@smoke',
    }, async ({ page }, testInfo) => {
      // TC001: Enter username: John Doe
      await page.evaluate(() => {
        const usernameField = document.getElementById('txt-username') as HTMLInputElement;
        usernameField.value = 'John Doe';
        usernameField.dispatchEvent(new Event('input', { bubbles: true }));
        usernameField.dispatchEvent(new Event('change', { bubbles: true }));
      });

      // TC001: Enter password: ThisIsNotAPassword
      await page.evaluate(() => {
        const passwordField = document.getElementById('txt-password') as HTMLInputElement;
        passwordField.value = 'ThisIsNotAPassword';
        passwordField.dispatchEvent(new Event('input', { bubbles: true }));
        passwordField.dispatchEvent(new Event('change', { bubbles: true }));
      });

      // TC001: Click on 'Login' button
      await page.evaluate(() => {
        (document.getElementById('btn-login') as HTMLButtonElement).click();
      });

      // TC001: Verify successful login and redirect to appointment page
      await expect(page).toHaveURL(/.*#appointment/);
      await expect(page.locator('#appointment')).toContainText('Make Appointment');

      // Verify navigation menu shows logout option
      await expect(page.locator('nav')).toContainText('Logout');

      await allure.feature('Authentication');
      await allure.story('Valid Login');
      await allure.severity('critical');

      const screenshot = await page.screenshot({ fullPage: true });
      await testInfo.attach('Successful Login Screenshot', {
        body: screenshot,
        contentType: 'image/png',
      });
    });
  });

  test.describe('Negative Test Cases - Empty Fields', () => {
    test('TC002: Login with Empty Username Field', {
      annotation: { type: 'Sadpath', description: 'Verify login fails when username is empty' },
      tag: '@sanity',
    }, async ({ page }, testInfo) => {
      // TC002: Leave username field empty
      // Username remains empty by default

      // TC002: Enter password: ThisIsNotAPassword
      await page.evaluate(() => {
        const passwordField = document.getElementById('txt-password') as HTMLInputElement;
        passwordField.value = 'ThisIsNotAPassword';
        passwordField.dispatchEvent(new Event('input', { bubbles: true }));
        passwordField.dispatchEvent(new Event('change', { bubbles: true }));
      });

      // TC002: Click on 'Login' button
      await page.evaluate(() => {
        (document.getElementById('btn-login') as HTMLButtonElement).click();
      });

      // TC002: Verify login fails and user remains on login page
      await expect(page).toHaveURL(/.*#login/);
      await expect(page.locator('body')).toContainText('Login failed! Please ensure the username and password are valid.');

      await allure.feature('Authentication');
      await allure.story('Empty Username Validation');
      await allure.severity('normal');

      const screenshot = await page.screenshot({ fullPage: true });
      await testInfo.attach('Empty Username Error Screenshot', {
        body: screenshot,
        contentType: 'image/png',
      });
    });

    test('TC003: Login with Empty Password Field', {
      annotation: { type: 'Sadpath', description: 'Verify login fails when password is empty' },
      tag: '@sanity',
    }, async ({ page }, testInfo) => {
      // TC003: Enter username: John Doe
      await page.evaluate(() => {
        const usernameField = document.getElementById('txt-username') as HTMLInputElement;
        usernameField.value = 'John Doe';
        usernameField.dispatchEvent(new Event('input', { bubbles: true }));
        usernameField.dispatchEvent(new Event('change', { bubbles: true }));
      });

      // TC003: Leave password field empty
      // Password remains empty by default

      // TC003: Click on 'Login' button
      await page.evaluate(() => {
        (document.getElementById('btn-login') as HTMLButtonElement).click();
      });

      // TC003: Verify login fails and user remains on login page
      await expect(page).toHaveURL(/.*#login/);
      await expect(page.locator('body')).toContainText('Login failed! Please ensure the username and password are valid.');

      await allure.feature('Authentication');
      await allure.story('Empty Password Validation');
      await allure.severity('normal');

      const screenshot = await page.screenshot({ fullPage: true });
      await testInfo.attach('Empty Password Error Screenshot', {
        body: screenshot,
        contentType: 'image/png',
      });
    });

    test('TC004: Login with Both Fields Empty', {
      annotation: { type: 'Sadpath', description: 'Verify login fails when both username and password are empty' },
      tag: '@sanity',
    }, async ({ page }, testInfo) => {
      // TC004: Leave both username and password fields empty
      // Both fields remain empty by default

      // TC004: Click on 'Login' button
      await page.evaluate(() => {
        (document.getElementById('btn-login') as HTMLButtonElement).click();
      });

      // TC004: Verify login fails and user remains on login page
      await expect(page).toHaveURL(/.*#login/);
      await expect(page.locator('body')).toContainText('Login failed! Please ensure the username and password are valid.');

      await allure.feature('Authentication');
      await allure.story('Both Fields Empty Validation');
      await allure.severity('normal');

      const screenshot = await page.screenshot({ fullPage: true });
      await testInfo.attach('Both Fields Empty Error Screenshot', {
        body: screenshot,
        contentType: 'image/png',
      });
    });
  });

  test.describe('Negative Test Cases - Invalid Credentials', () => {
    test('TC005: Login with Invalid Username', {
      annotation: { type: 'Sadpath', description: 'Verify login fails with invalid username' },
      tag: '@sanity',
    }, async ({ page }, testInfo) => {
      // TC005: Enter username: InvalidUser123
      await page.evaluate(() => {
        const usernameField = document.getElementById('txt-username') as HTMLInputElement;
        usernameField.value = 'InvalidUser123';
        usernameField.dispatchEvent(new Event('input', { bubbles: true }));
        usernameField.dispatchEvent(new Event('change', { bubbles: true }));
      });

      // TC005: Enter password: ThisIsNotAPassword
      await page.evaluate(() => {
        const passwordField = document.getElementById('txt-password') as HTMLInputElement;
        passwordField.value = 'ThisIsNotAPassword';
        passwordField.dispatchEvent(new Event('input', { bubbles: true }));
        passwordField.dispatchEvent(new Event('change', { bubbles: true }));
      });

      // TC005: Click on 'Login' button
      await page.evaluate(() => {
        (document.getElementById('btn-login') as HTMLButtonElement).click();
      });

      // TC005: Verify login fails and error message is displayed
      await expect(page).toHaveURL(/.*#login/);
      await expect(page.locator('body')).toContainText('Login failed! Please ensure the username and password are valid.');

      await allure.feature('Authentication');
      await allure.story('Invalid Username Validation');
      await allure.severity('normal');

      const screenshot = await page.screenshot({ fullPage: true });
      await testInfo.attach('Invalid Username Error Screenshot', {
        body: screenshot,
        contentType: 'image/png',
      });
    });

    test('TC006: Login with Invalid Password', {
      annotation: { type: 'Sadpath', description: 'Verify login fails with invalid password' },
      tag: '@sanity',
    }, async ({ page }, testInfo) => {
      // TC006: Enter username: John Doe
      await page.evaluate(() => {
        const usernameField = document.getElementById('txt-username') as HTMLInputElement;
        usernameField.value = 'John Doe';
        usernameField.dispatchEvent(new Event('input', { bubbles: true }));
        usernameField.dispatchEvent(new Event('change', { bubbles: true }));
      });

      // TC006: Enter password: WrongPassword123
      await page.evaluate(() => {
        const passwordField = document.getElementById('txt-password') as HTMLInputElement;
        passwordField.value = 'WrongPassword123';
        passwordField.dispatchEvent(new Event('input', { bubbles: true }));
        passwordField.dispatchEvent(new Event('change', { bubbles: true }));
      });

      // TC006: Click on 'Login' button
      await page.evaluate(() => {
        (document.getElementById('btn-login') as HTMLButtonElement).click();
      });

      // TC006: Verify login fails and error message is displayed
      await expect(page).toHaveURL(/.*#login/);
      await expect(page.locator('body')).toContainText('Login failed! Please ensure the username and password are valid.');

      await allure.feature('Authentication');
      await allure.story('Invalid Password Validation');
      await allure.severity('normal');

      const screenshot = await page.screenshot({ fullPage: true });
      await testInfo.attach('Invalid Password Error Screenshot', {
        body: screenshot,
        contentType: 'image/png',
      });
    });
  });

  test.describe('Negative Test Cases - Special Characters & SQL Injection', () => {
    test('TC007: Login with Special Characters in Username', {
      annotation: { type: 'Sadpath', description: 'Verify login fails with special characters in username' },
      tag: '@security',
    }, async ({ page }, testInfo) => {
      // TC007: Enter username with special characters: John@#$%^&*()
      await page.evaluate(() => {
        const usernameField = document.getElementById('txt-username') as HTMLInputElement;
        usernameField.value = 'John@#$%^&*()';
        usernameField.dispatchEvent(new Event('input', { bubbles: true }));
        usernameField.dispatchEvent(new Event('change', { bubbles: true }));
      });

      // TC007: Enter password: ThisIsNotAPassword
      await page.evaluate(() => {
        const passwordField = document.getElementById('txt-password') as HTMLInputElement;
        passwordField.value = 'ThisIsNotAPassword';
        passwordField.dispatchEvent(new Event('input', { bubbles: true }));
        passwordField.dispatchEvent(new Event('change', { bubbles: true }));
      });

      // TC007: Click on 'Login' button
      await page.evaluate(() => {
        (document.getElementById('btn-login') as HTMLButtonElement).click();
      });

      // TC007: Verify login fails and error message is displayed
      await expect(page).toHaveURL(/.*#login/);
      await expect(page.locator('body')).toContainText('Login failed! Please ensure the username and password are valid.');

      await allure.feature('Authentication');
      await allure.story('Special Characters Validation');
      await allure.severity('normal');

      const screenshot = await page.screenshot({ fullPage: true });
      await testInfo.attach('Special Characters Error Screenshot', {
        body: screenshot,
        contentType: 'image/png',
      });
    });

    test('TC008: Login with SQL Injection Attempt in Username', {
      annotation: { type: 'Security Test', description: 'Verify SQL injection prevention in username field' },
      tag: '@security',
    }, async ({ page }, testInfo) => {
      // TC008: Enter username with SQL injection payload: ' OR '1'='1
      await page.evaluate(() => {
        const usernameField = document.getElementById('txt-username') as HTMLInputElement;
        usernameField.value = "' OR '1'='1";
        usernameField.dispatchEvent(new Event('input', { bubbles: true }));
        usernameField.dispatchEvent(new Event('change', { bubbles: true }));
      });

      // TC008: Enter password: anything
      await page.evaluate(() => {
        const passwordField = document.getElementById('txt-password') as HTMLInputElement;
        passwordField.value = 'anything';
        passwordField.dispatchEvent(new Event('input', { bubbles: true }));
        passwordField.dispatchEvent(new Event('change', { bubbles: true }));
      });

      // TC008: Click on 'Login' button
      await page.evaluate(() => {
        (document.getElementById('btn-login') as HTMLButtonElement).click();
      });

      // TC008: Verify SQL injection is prevented and login fails
      await expect(page).toHaveURL(/.*#login/);
      await expect(page.locator('body')).toContainText('Login failed! Please ensure the username and password are valid.');

      await allure.feature('Security');
      await allure.story('SQL Injection Prevention - Username');
      await allure.severity('critical');

      const screenshot = await page.screenshot({ fullPage: true });
      await testInfo.attach('SQL Injection Username Prevention Screenshot', {
        body: screenshot,
        contentType: 'image/png',
      });
    });

    test('TC009: Login with SQL Injection Attempt in Password', {
      annotation: { type: 'Security Test', description: 'Verify SQL injection prevention in password field' },
      tag: '@security',
    }, async ({ page }, testInfo) => {
      // TC009: Enter username: John Doe
      await page.evaluate(() => {
        const usernameField = document.getElementById('txt-username') as HTMLInputElement;
        usernameField.value = 'John Doe';
        usernameField.dispatchEvent(new Event('input', { bubbles: true }));
        usernameField.dispatchEvent(new Event('change', { bubbles: true }));
      });

      // TC009: Enter password with SQL injection payload: ' OR '1'='1
      await page.evaluate(() => {
        const passwordField = document.getElementById('txt-password') as HTMLInputElement;
        passwordField.value = "' OR '1'='1";
        passwordField.dispatchEvent(new Event('input', { bubbles: true }));
        passwordField.dispatchEvent(new Event('change', { bubbles: true }));
      });

      // TC009: Click on 'Login' button
      await page.evaluate(() => {
        (document.getElementById('btn-login') as HTMLButtonElement).click();
      });

      // TC009: Verify SQL injection is prevented and login fails
      await expect(page).toHaveURL(/.*#login/);
      await expect(page.locator('body')).toContainText('Login failed! Please ensure the username and password are valid.');

      await allure.feature('Security');
      await allure.story('SQL Injection Prevention - Password');
      await allure.severity('critical');

      const screenshot = await page.screenshot({ fullPage: true });
      await testInfo.attach('SQL Injection Password Prevention Screenshot', {
        body: screenshot,
        contentType: 'image/png',
      });
    });

    test('TC010: Login with Spaces in Username', {
      annotation: { type: 'Sadpath', description: 'Verify behavior with leading/trailing spaces in username' },
      tag: '@sanity',
    }, async ({ page }, testInfo) => {
      // TC010: Enter username with leading and trailing spaces: '  John Doe  '
      await page.evaluate(() => {
        const usernameField = document.getElementById('txt-username') as HTMLInputElement;
        usernameField.value = '  John Doe  ';
        usernameField.dispatchEvent(new Event('input', { bubbles: true }));
        usernameField.dispatchEvent(new Event('change', { bubbles: true }));
      });

      // TC010: Enter password: ThisIsNotAPassword
      await page.evaluate(() => {
        const passwordField = document.getElementById('txt-password') as HTMLInputElement;
        passwordField.value = 'ThisIsNotAPassword';
        passwordField.dispatchEvent(new Event('input', { bubbles: true }));
        passwordField.dispatchEvent(new Event('change', { bubbles: true }));
      });

      // TC010: Click on 'Login' button
      await page.evaluate(() => {
        (document.getElementById('btn-login') as HTMLButtonElement).click();
      });

      // TC010: Verify login result - should either succeed (if whitespace is trimmed) or fail with error message
      const currentUrl = page.url();
      if (currentUrl.includes('#appointment')) {
        // Login succeeded - whitespace was trimmed
        await expect(page.locator('#appointment')).toContainText('Make Appointment');
      } else {
        // Login failed - whitespace not trimmed
        await expect(page).toHaveURL(/.*#login/);
        await expect(page.locator('body')).toContainText('Login failed! Please ensure the username and password are valid.');
      }

      await allure.feature('Authentication');
      await allure.story('Username Whitespace Handling');
      await allure.severity('minor');

      const screenshot = await page.screenshot({ fullPage: true });
      await testInfo.attach('Whitespace Username Test Screenshot', {
        body: screenshot,
        contentType: 'image/png',
      });
    });
  });
});
