import { test, expect } from '@playwright/test';
import { DashboardPage } from '../pages';

test.describe('Settings', () => {
  test('should display settings heading', async ({ page }) => {
    const dashboard = new DashboardPage(page);
    await dashboard.navigate();
    
    // Click Settings in sidebar
    await page.locator('nav button:has-text("Settings")').click();
    
    // Check heading
    await expect(page.getByRole('heading', { name: 'Settings' })).toBeVisible();
  });

  test('should display appearance settings', async ({ page }) => {
    const dashboard = new DashboardPage(page);
    await dashboard.navigate();
    
    await page.locator('nav button:has-text("Settings")').click();

    await expect(page.locator('text=Appearance').first()).toBeVisible();
    await expect(page.getByRole('button', { name: 'Light', exact: true })).toBeVisible();
    await expect(page.getByRole('button', { name: 'Dark', exact: true })).toBeVisible();
  });

  test('should display logs section', async ({ page }) => {
    const dashboard = new DashboardPage(page);
    await dashboard.navigate();
    
    await page.locator('nav button:has-text("Settings")').click();

    // Use heading role to be more specific
    await expect(page.locator('h3:has-text("Logs"), h2:has-text("Logs")').first()).toBeVisible();
  });

  test('should switch between themes', async ({ page }) => {
    const dashboard = new DashboardPage(page);
    await dashboard.navigate();
    
    await page.locator('nav button:has-text("Settings")').click();

    // Switch to light theme
    await page.getByRole('button', { name: 'Light', exact: true }).click();
    await page.waitForTimeout(300);
    
    // Switch to dark theme
    await page.getByRole('button', { name: 'Dark', exact: true }).click();
    await page.waitForTimeout(300);
    await expect(page.locator('html')).toHaveClass(/dark/);
  });
});
