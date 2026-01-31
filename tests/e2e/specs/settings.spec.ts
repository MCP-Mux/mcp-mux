import { test, expect } from '@playwright/test';
import { DashboardPage, SidebarNav, SettingsPage } from '../pages';

test.describe('Settings', () => {
  test.beforeEach(async ({ page }) => {
    const dashboard = new DashboardPage(page);
    const sidebar = new SidebarNav(page);

    await dashboard.navigate();
    await sidebar.goToSettings();
  });

  test('should display appearance settings', async ({ page }) => {
    const settings = new SettingsPage(page);

    await expect(page.locator('text=Appearance')).toBeVisible();
    await expect(settings.lightThemeButton).toBeVisible();
    await expect(settings.darkThemeButton).toBeVisible();
    await expect(settings.systemThemeButton).toBeVisible();
  });

  test('should display logs section', async ({ page }) => {
    const settings = new SettingsPage(page);

    await expect(page.locator('text=Logs')).toBeVisible();
    await expect(settings.openLogsButton).toBeVisible();
  });

  test('should switch between themes', async ({ page }) => {
    const settings = new SettingsPage(page);

    // Switch to light theme
    await settings.selectTheme('light');
    // The HTML element should have light theme class
    await expect(page.locator('html')).not.toHaveClass(/dark/);

    // Switch to dark theme
    await settings.selectTheme('dark');
    await expect(page.locator('html')).toHaveClass(/dark/);
  });
});
