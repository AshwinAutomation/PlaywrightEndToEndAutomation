// spec: tests/cura-healthcare.plan.md
// seed: tests/seed.spec.ts

import { test, expect } from '@playwright/test';

test.describe('Login Page Tests', () => {
  test('TC001: Successful Login with Valid Credentials', async ({ page }) => {
    // 1. Navigate to https://katalon-demo-cura.herokuapp.com/
    await page.goto('https://katalon-demo-cura.herokuapp.com/');

    // 2. Click on 'Make Appointment' button to navigate to Login page
    await page.getByRole('link', { name: 'Make Appointment' }).click();
    
    // Verify login page is displayed
    await expect(page).toHaveURL(/profile\.php#login/);
    await expect(page.getByRole('heading', { name: 'Login' })).toBeVisible();

    // 3. Enter username: John Doe
    await page.getByLabel('Username').fill('John Doe');

    // 4. Enter password: ThisIsNotAPassword
    await page.getByLabel('Password').fill('ThisIsNotAPassword');

    // 5. Click on 'Login' button
    await page.getByRole('button', { name: 'Login' }).click();

    // Verify user is successfully logged in
    await expect(page).toHaveURL(/appointment/);
    
    // Verify navigation menu shows: Home, History, Profile, Logout
    await expect(page.getByRole('link', { name: 'Home' })).toBeVisible();
    await expect(page.getByRole('link', { name: 'History' })).toBeVisible();
    await expect(page.getByRole('link', { name: 'Profile' })).toBeVisible();
    await expect(page.getByRole('link', { name: 'Logout' })).toBeVisible();
    
    // Verify appointment booking page is displayed
    await expect(page.getByRole('heading', { name: 'Make Appointment' })).toBeVisible();
  });
});
