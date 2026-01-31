import { test, expect } from '@playwright/test';
import { DashboardPage, SidebarNav, SettingsPage } from '../pages';

test.describe('Navigation', () => {
  test('should load the dashboard on startup', async ({ page }) => {
    const dashboard = new DashboardPage(page);
    await dashboard.navigate();

    await expect(dashboard.heading).toBeVisible();
    await expect(page.locator('text=Welcome to McpMux')).toBeVisible();
  });

  test('should navigate to settings page', async ({ page }) => {
    const dashboard = new DashboardPage(page);
    const sidebar = new SidebarNav(page);
    const settings = new SettingsPage(page);

    await dashboard.navigate();
    await sidebar.goToSettings();

    await expect(settings.heading).toBeVisible();
    await expect(page.locator('text=Configure McpMux')).toBeVisible();
  });

  test('should navigate to all main pages', async ({ page }) => {
    const dashboard = new DashboardPage(page);
    const sidebar = new SidebarNav(page);

    await dashboard.navigate();

    // Navigate to each page and verify heading
    await sidebar.goToMyServers();
    await expect(page.getByRole('heading', { name: /Servers|My Servers/i })).toBeVisible();

    await sidebar.goToDiscover();
    await expect(page.getByRole('heading', { name: /Discover|Registry/i })).toBeVisible();

    await sidebar.goToSpaces();
    await expect(page.getByRole('heading', { name: 'Spaces' })).toBeVisible();

    await sidebar.goToFeatureSets();
    await expect(page.getByRole('heading', { name: /FeatureSets|Feature Sets/i })).toBeVisible();

    await sidebar.goToClients();
    await expect(page.getByRole('heading', { name: 'Clients' })).toBeVisible();

    await sidebar.goToDashboard();
    await expect(dashboard.heading).toBeVisible();
  });
});
