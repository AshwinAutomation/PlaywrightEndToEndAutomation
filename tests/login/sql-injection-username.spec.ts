// spec: tests/cura-healthcare.plan.md
// seed: tests/seed.spec.ts

import { test, expect } from '@playwright/test';

test.describe('Login Page Tests', () => {
  test('TC008: Login with SQL Injection Attempt in Username', async ({ page }) => {
    // Navigate to login page
    await page.goto('https://katalon-demo-cura.herokuapp.com/profile.php#login');
    
    // Verify login page is displayed
    await expect(page).toHaveURL('https://katalon-demo-cura.herokuapp.com/profile.php#login');
    const usernameField = page.getByLabel('Username');
    const passwordField = page.getByLabel('Password');
    await expect(usernameField).toBeVisible();
    await expect(passwordField).toBeVisible();

    // Enter SQL injection payload in username field
    await page.getByLabel('Username').fill('\' OR \'1\'=\'1');
    
    // Verify username field is populated with SQL injection payload
    await expect(usernameField).toHaveValue('\' OR \'1\'=\'1');

    // Enter password anything
    await page.getByLabel('Password').fill('anything');
    
    // Verify password field is populated
    await expect(passwordField).toHaveValue('anything');

    // Click Login button with SQL injection attempt in username
    await page.getByRole('button', { name: 'Login' }).click();
    
    // Verify SQL injection attempt is prevented and user remains on login page
    await expect(page).toHaveURL('https://katalon-demo-cura.herokuapp.com/profile.php#login');
    
    // Verify error message is displayed
    const errorMessage = page.locator('text=Login failed! Please ensure the username and password are valid.');
    await expect(errorMessage).toBeVisible();
  });
});
