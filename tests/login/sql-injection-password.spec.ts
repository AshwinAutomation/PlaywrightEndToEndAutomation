// spec: tests/cura-healthcare.plan.md
// seed: tests/seed.spec.ts

import { test, expect } from '@playwright/test';

test.describe('Login Page Tests', () => {
  test('TC009: Login with SQL Injection Attempt in Password', async ({ page }) => {
    // Navigate to login page
    await page.goto('https://katalon-demo-cura.herokuapp.com/profile.php#login');
    
    // Verify login page is displayed
    await expect(page).toHaveURL('https://katalon-demo-cura.herokuapp.com/profile.php#login');
    const usernameField = page.getByLabel('Username');
    const passwordField = page.getByLabel('Password');
    await expect(usernameField).toBeVisible();
    await expect(passwordField).toBeVisible();

    // Enter username: John Doe
    await page.getByLabel('Username').fill('John Doe');
    
    // Verify username field is populated
    await expect(usernameField).toHaveValue('John Doe');

    // Enter SQL injection payload in password field
    await page.getByLabel('Password').fill('\' OR \'1\'=\'1');
    
    // Verify password field is populated with SQL injection payload
    await expect(passwordField).toHaveValue('\' OR \'1\'=\'1');

    // Click Login button with SQL injection attempt in password
    await page.getByRole('button', { name: 'Login' }).click();
    
    // Verify SQL injection attempt is prevented and user remains on login page
    await expect(page).toHaveURL('https://katalon-demo-cura.herokuapp.com/profile.php#login');
    
    // Verify error message is displayed
    const errorMessage = page.locator('text=Login failed! Please ensure the username and password are valid.');
    await expect(errorMessage).toBeVisible();
  });
});
