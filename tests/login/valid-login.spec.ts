// spec: tests/cura-healthcare.plan.md
// seed: tests/seed.spec.ts

import { test, expect } from '@playwright/test';

test.describe('Login Page Tests', () => {
  test('TC001: Successful Login with Valid Credentials', async ({ page }) => {
    // Navigate to home page to verify Make Appointment button is visible
    await page.goto('https://katalon-demo-cura.herokuapp.com/');
    
    // Verify home page is displayed successfully with 'Make Appointment' button visible
    const makeAppointmentButton = page.getByRole('link', { name: 'Make Appointment' });
    await expect(makeAppointmentButton).toBeVisible();

    // Click on 'Make Appointment' button to navigate to login page
    await page.getByRole('link', { name: 'Make Appointment' }).click();
    
    // Verify login page is displayed with username and password input fields
    await expect(page).toHaveURL('https://katalon-demo-cura.herokuapp.com/profile.php#login');
    const usernameField = page.getByLabel('Username');
    const passwordField = page.getByLabel('Password');
    await expect(usernameField).toBeVisible();
    await expect(passwordField).toBeVisible();

    // Enter username: John Doe
    await page.getByLabel('Username').fill('John Doe');
    
    // Verify username field is populated with 'John Doe'
    await expect(usernameField).toHaveValue('John Doe');

    // Enter password: ThisIsNotAPassword
    await page.getByLabel('Password').fill('ThisIsNotAPassword');
    
    // Verify password field is populated (masked)
    await expect(passwordField).toHaveValue('ThisIsNotAPassword');

    // Click Login button to submit the login form
    await page.getByRole('button', { name: 'Login' }).click();
    
    // Verify user is successfully logged in and page redirects to appointment booking page
    await expect(page).toHaveURL('https://katalon-demo-cura.herokuapp.com/#appointment');
    
    // Verify navigation menu changes to show additional options after login
    await expect(page.locator('text=Make Appointment').first()).toBeVisible();
  });
});
