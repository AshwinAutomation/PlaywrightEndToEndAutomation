// spec: tests/cura-healthcare.plan.md
// seed: tests/seed.spec.ts

import { test, expect } from '@playwright/test';

test.describe('Login Page Tests', () => {
  test('TC007: Login with Special Characters in Username', async ({ page }) => {
    // Navigate to login page
    await page.goto('https://katalon-demo-cura.herokuapp.com/profile.php#login');
    
    // Verify login page is displayed
    await expect(page).toHaveURL('https://katalon-demo-cura.herokuapp.com/profile.php#login');
    const usernameField = page.getByLabel('Username');
    const passwordField = page.getByLabel('Password');
    await expect(usernameField).toBeVisible();
    await expect(passwordField).toBeVisible();

    // Enter username with special characters John@#$%^&*()
    await page.getByLabel('Username').fill('John@#$%^&*()');
    
    // Verify username field is populated with special characters
    await expect(usernameField).toHaveValue('John@#$%^&*()');

    // Enter password ThisIsNotAPassword
    await page.getByLabel('Password').fill('ThisIsNotAPassword');
    
    // Verify password field is populated
    await expect(passwordField).toHaveValue('ThisIsNotAPassword');

    // Click Login button with special characters in username
    await page.getByRole('button', { name: 'Login' }).click();
    
    // Verify login fails and user remains on login page
    await expect(page).toHaveURL('https://katalon-demo-cura.herokuapp.com/profile.php#login');
    
    // Verify error message is displayed
    const errorMessage = page.locator('text=Login failed! Please ensure the username and password are valid.');
    await expect(errorMessage).toBeVisible();
  });
});
