import { test, expect } from '@playwright/test';
import { DashboardPage } from '../pages';

test.describe('Dashboard', () => {
  test('should display gateway status', async ({ page }) => {
    const dashboard = new DashboardPage(page);
    await dashboard.navigate();

    // Gateway status should be visible
    await expect(dashboard.gatewayStatus).toBeVisible();
    await expect(dashboard.gatewayToggleButton).toBeVisible();
  });

  test('should display stats cards', async ({ page }) => {
    const dashboard = new DashboardPage(page);
    await dashboard.navigate();

    // All stat cards should be visible
    await expect(dashboard.serverCountCard).toBeVisible();
    await expect(dashboard.featureSetsCard).toBeVisible();
    await expect(dashboard.clientsCard).toBeVisible();
    await expect(dashboard.activeSpaceCard).toBeVisible();
  });

  test('should display client config section', async ({ page }) => {
    const dashboard = new DashboardPage(page);
    await dashboard.navigate();

    // Config section should be visible
    await expect(page.locator('text=Connect Your Client')).toBeVisible();
    await expect(dashboard.configCopyButton).toBeVisible();
  });

  test('should copy config to clipboard', async ({ page, context, browserName }) => {
    // Clipboard permissions only work on Chromium
    test.skip(browserName !== 'chromium', 'Clipboard permissions not supported');

    await context.grantPermissions(['clipboard-read', 'clipboard-write']);

    const dashboard = new DashboardPage(page);
    await dashboard.navigate();

    await dashboard.copyConfig();

    // Check for success message
    await expect(page.locator('text=copied')).toBeVisible({ timeout: 2000 });
  });
});
