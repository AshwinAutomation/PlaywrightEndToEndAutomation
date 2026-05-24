// spec: tests/cura-healthcare.plan.md
// seed: tests/seed.spec.ts

import { test, expect } from '@playwright/test';

test.describe('Login Page Tests', () => {
  test('TC002: Login with Empty Username Field', async ({ page }) => {
    // 1. Navigate to login page
    await page.goto('https://katalon-demo-cura.herokuapp.com/profile.php#login');
    
    // Verify login page is displayed
    await expect(page).toHaveURL(/profile\.php#login/);
    await expect(page.getByRole('heading', { name: 'Login' })).toBeVisible();

    // 2. Leave username field empty (do nothing)
    
    // 3. Enter password: ThisIsNotAPassword
    await page.getByLabel('Password').fill('ThisIsNotAPassword');

    // 4. Click on 'Login' button
    await page.getByRole('button', { name: 'Login' }).click();

    // Verify login fails and user remains on login page
    await expect(page).toHaveURL(/profile\.php#login/);
    
    // Verify error message is displayed
    const errorMessage = page.locator('text=Login failed! Please ensure the username and password are valid.');
    await expect(errorMessage).toBeVisible();
  });

  test('TC003: Login with Empty Password Field', async ({ page }) => {
    // 1. Navigate to login page
    await page.goto('https://katalon-demo-cura.herokuapp.com/profile.php#login');
    
    // Verify login page is displayed
    await expect(page).toHaveURL(/profile\.php#login/);
    await expect(page.getByRole('heading', { name: 'Login' })).toBeVisible();

    // 2. Enter username: John Doe
    await page.getByLabel('Username').fill('John Doe');

    // 3. Leave password field empty (do nothing)
    
    // 4. Click on 'Login' button
    await page.getByRole('button', { name: 'Login' }).click();

    // Verify login fails and user remains on login page
    await expect(page).toHaveURL(/profile\.php#login/);
    
    // Verify error message is displayed
    const errorMessage = page.locator('text=Login failed! Please ensure the username and password are valid.');
    await expect(errorMessage).toBeVisible();
  });

  test('TC004: Login with Both Fields Empty', async ({ page }) => {
    // 1. Navigate to login page
    await page.goto('https://katalon-demo-cura.herokuapp.com/profile.php#login');
    
    // Verify login page is displayed
    await expect(page).toHaveURL(/profile\.php#login/);
    await expect(page.getByRole('heading', { name: 'Login' })).toBeVisible();

    // 2. Leave both username and password fields empty (do nothing)
    
    // 3. Click on 'Login' button
    await page.getByRole('button', { name: 'Login' }).click();

    // Verify login fails and user remains on login page
    await expect(page).toHaveURL(/profile\.php#login/);
    
    // Verify error message is displayed
    const errorMessage = page.locator('text=Login failed! Please ensure the username and password are valid.');
    await expect(errorMessage).toBeVisible();
  });

  test('TC005: Login with Invalid Username', async ({ page }) => {
    // 1. Navigate to login page
    await page.goto('https://katalon-demo-cura.herokuapp.com/profile.php#login');
    
    // Verify login page is displayed
    await expect(page).toHaveURL(/profile\.php#login/);
    await expect(page.getByRole('heading', { name: 'Login' })).toBeVisible();

    // 2. Enter username: InvalidUser123
    await page.getByLabel('Username').fill('InvalidUser123');

    // 3. Enter password: ThisIsNotAPassword
    await page.getByLabel('Password').fill('ThisIsNotAPassword');

    // 4. Click on 'Login' button
    await page.getByRole('button', { name: 'Login' }).click();

    // Verify login fails and user remains on login page
    await expect(page).toHaveURL(/profile\.php#login/);
    
    // Verify error message indicating 'Invalid username or password' is displayed
    const errorMessage = page.locator('text=Login failed! Please ensure the username and password are valid.');
    await expect(errorMessage).toBeVisible();
  });

  test('TC006: Login with Invalid Password', async ({ page }) => {
    // 1. Navigate to login page
    await page.goto('https://katalon-demo-cura.herokuapp.com/profile.php#login');
    
    // Verify login page is displayed
    await expect(page).toHaveURL(/profile\.php#login/);
    await expect(page.getByRole('heading', { name: 'Login' })).toBeVisible();

    // 2. Enter username: John Doe
    await page.getByLabel('Username').fill('John Doe');

    // 3. Enter password: WrongPassword123
    await page.getByLabel('Password').fill('WrongPassword123');

    // 4. Click on 'Login' button
    await page.getByRole('button', { name: 'Login' }).click();

    // Verify login fails and user remains on login page
    await expect(page).toHaveURL(/profile\.php#login/);
    
    // Verify error message indicating 'Invalid username or password' is displayed
    const errorMessage = page.locator('text=Login failed! Please ensure the username and password are valid.');
    await expect(errorMessage).toBeVisible();
  });
});
