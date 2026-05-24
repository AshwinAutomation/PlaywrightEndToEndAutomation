// spec: tests/cura-healthcare.plan.md
// seed: tests/seed.spec.ts

import { test, expect } from '@playwright/test';

test.describe('Login Page Tests', () => {
  test('TC005: Login with Invalid Username', async ({ page }) => {
    // Navigate to login page
    await page.goto('https://katalon-demo-cura.herokuapp.com/profile.php#login');
    
    // Verify login page is displayed
    await expect(page).toHaveURL('https://katalon-demo-cura.herokuapp.com/profile.php#login');
    const usernameField = page.getByLabel('Username');
    const passwordField = page.getByLabel('Password');
    await expect(usernameField).toBeVisible();
    await expect(passwordField).toBeVisible();

    // Enter username: InvalidUser123
    await page.getByLabel('Username').fill('InvalidUser123');
    
    // Verify username field is populated with 'InvalidUser123'
    await expect(usernameField).toHaveValue('InvalidUser123');

    // Enter password: ThisIsNotAPassword
    await page.getByLabel('Password').fill('ThisIsNotAPassword');
    
    // Verify password field is populated
    await expect(passwordField).toHaveValue('ThisIsNotAPassword');

    // Click Login button with invalid username
    await page.getByRole('button', { name: 'Login' }).click();
    
    // Verify login fails and user remains on login page
    await expect(page).toHaveURL('https://katalon-demo-cura.herokuapp.com/profile.php#login');
    
    // Verify error message indicating 'Invalid username or password' is displayed
    const errorMessage = page.locator('text=Login failed! Please ensure the username and password are valid.');
    await expect(errorMessage).toBeVisible();
  });
});
