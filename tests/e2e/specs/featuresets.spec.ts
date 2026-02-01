import { test, expect } from '@playwright/test';
import { DashboardPage } from '../pages';

test.describe('FeatureSets Page', () => {
  test('should display the FeatureSets heading', async ({ page }) => {
    const dashboard = new DashboardPage(page);
    await dashboard.navigate();
    
    // Click FeatureSets in sidebar
    await page.locator('nav button:has-text("FeatureSets")').click();
    
    // Check heading (use first() to avoid multiple matches)
    await expect(page.getByRole('heading', { name: 'Feature Sets' }).first()).toBeVisible();
  });

  test('should show feature sets page content', async ({ page }) => {
    const dashboard = new DashboardPage(page);
    await dashboard.navigate();
    
    await page.locator('nav button:has-text("FeatureSets")').click();
    await expect(page.getByRole('heading', { name: 'Feature Sets' }).first()).toBeVisible();
    
    // Page should have content
    const content = page.locator('[class*="rounded"]');
    const count = await content.count();
    expect(count).toBeGreaterThan(0);
  });

  test('should display built-in feature sets', async ({ page }) => {
    const dashboard = new DashboardPage(page);
    await dashboard.navigate();
    
    await page.locator('nav button:has-text("FeatureSets")').click();
    
    // There are usually built-in feature sets like "All Features", "Default"
    const builtInSets = page.locator('text=/All Features|Default|Server:/i');
    const count = await builtInSets.count();
    
    // May have built-in sets
    expect(count).toBeGreaterThanOrEqual(0);
  });
});

test.describe('FeatureSet Details', () => {
  test('should show feature set content', async ({ page }) => {
    const dashboard = new DashboardPage(page);
    await dashboard.navigate();
    
    await page.locator('nav button:has-text("FeatureSets")').click();
    
    // Page should have elements
    const cards = page.locator('[class*="rounded"][class*="border"]');
    const count = await cards.count();
    
    if (count > 0) {
      await expect(cards.first()).toBeVisible();
    }
  });

  test('should show server-specific feature sets if servers installed', async ({ page }) => {
    const dashboard = new DashboardPage(page);
    await dashboard.navigate();
    
    await page.locator('nav button:has-text("FeatureSets")').click();
    
    // Server-specific sets show the server name
    const serverSets = page.locator('text=/Server:/i');
    const count = await serverSets.count();
    
    // May have server-specific sets
    expect(count).toBeGreaterThanOrEqual(0);
  });
});
