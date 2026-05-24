// spec: tests/cura-healthcare.plan.md
// seed: tests/seed.spec.ts

import { test, expect } from '@playwright/test';

test.describe('Login Page Tests', () => {
  test('TC002: Login with Empty Username Field', async ({ page }) => {
    // Navigate to login page
    await page.goto('https://katalon-demo-cura.herokuapp.com/profile.php#login');
    
    // Verify login page is displayed
    await expect(page).toHaveURL('https://katalon-demo-cura.herokuapp.com/profile.php#login');
    const usernameField = page.getByLabel('Username');
    const passwordField = page.getByLabel('Password');
    await expect(usernameField).toBeVisible();
    await expect(passwordField).toBeVisible();

    // Leave username field empty
    // Verify username field remains empty
    await expect(usernameField).toHaveValue('');

    // Enter password without username
    await page.getByLabel('Password').fill('ThisIsNotAPassword');
    
    // Verify password field is populated
    await expect(passwordField).toHaveValue('ThisIsNotAPassword');

    // Click Login button with empty username
    await page.getByRole('button', { name: 'Login' }).click();
    
    // Verify login fails and user remains on login page
    await expect(page).toHaveURL('https://katalon-demo-cura.herokuapp.com/profile.php#login');
    
    // Verify error message is displayed
    const errorMessage = page.locator('text=Login failed! Please ensure the username and password are valid.');
    await expect(errorMessage).toBeVisible();
  });
});
