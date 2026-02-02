import { test, expect } from '@playwright/test';
import { DashboardPage } from '../pages';

// Helper to click Spaces in sidebar (avoids space switcher button)
async function goToSpaces(page: import('@playwright/test').Page) {
  await page.locator('nav button:has-text("Spaces")').last().click();
}

test.describe('Spaces Page', () => {
  test('should display the Workspaces heading', async ({ page }) => {
    const dashboard = new DashboardPage(page);
    await dashboard.navigate();
    
    await goToSpaces(page);
    
    // Check main page heading (h1 specifically)
    await expect(page.locator('h1:has-text("Workspaces")')).toBeVisible();
  });

  test('should show space management UI', async ({ page }) => {
    const dashboard = new DashboardPage(page);
    await dashboard.navigate();
    
    await goToSpaces(page);
    await expect(page.locator('h1:has-text("Workspaces")')).toBeVisible();
    
    // Page should have some content
    const content = page.locator('[class*="rounded"]');
    const count = await content.count();
    expect(count).toBeGreaterThan(0);
  });

  test('should show space details elements', async ({ page }) => {
    const dashboard = new DashboardPage(page);
    await dashboard.navigate();
    
    await goToSpaces(page);
    
    // Each space should have a name
    const spaceNames = page.locator('[class*="font-medium"], [class*="font-semibold"]');
    const count = await spaceNames.count();
    
    expect(count).toBeGreaterThan(0);
  });
});

test.describe('Space Switcher', () => {
  test('should show current space name on dashboard', async ({ page }) => {
    const dashboard = new DashboardPage(page);
    await dashboard.navigate();
    
    // Dashboard should show active space card
    const activeSpaceCard = page.locator('text=Active Space').first();
    await expect(activeSpaceCard).toBeVisible();
  });

  test('should display active space info', async ({ page }) => {
    const dashboard = new DashboardPage(page);
    await dashboard.navigate();
    
    // Active space card should have content
    const spaceCard = page.locator('text=Active Space').first().locator('xpath=ancestor::div[contains(@class, "rounded")]');
    await expect(spaceCard.first()).toBeVisible();
  });
});

test.describe('Space Management', () => {
  test('should navigate to workspaces page', async ({ page }) => {
    const dashboard = new DashboardPage(page);
    await dashboard.navigate();
    
    await goToSpaces(page);
    
    // Verify page loaded correctly with Workspaces h1 heading
    await expect(page.locator('h1:has-text("Workspaces")')).toBeVisible();
  });

  test('should show workspaces page content', async ({ page }) => {
    const dashboard = new DashboardPage(page);
    await dashboard.navigate();
    
    await goToSpaces(page);
    await expect(page.locator('h1:has-text("Workspaces")')).toBeVisible();
    
    // Page should have content elements
    const content = page.locator('[class*="rounded"]');
    const count = await content.count();
    expect(count).toBeGreaterThan(0);
  });
});
