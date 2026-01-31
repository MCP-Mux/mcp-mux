import { Page, Locator } from '@playwright/test';

/**
 * Sidebar navigation component
 */
export class SidebarNav {
  readonly page: Page;
  readonly dashboard: Locator;
  readonly myServers: Locator;
  readonly discover: Locator;
  readonly spaces: Locator;
  readonly featureSets: Locator;
  readonly clients: Locator;
  readonly settings: Locator;
  readonly spaceSwitcher: Locator;
  readonly themeToggle: Locator;

  constructor(page: Page) {
    this.page = page;
    this.dashboard = page.getByRole('button', { name: 'Dashboard' });
    this.myServers = page.getByRole('button', { name: 'My Servers' });
    this.discover = page.getByRole('button', { name: 'Discover' });
    this.spaces = page.getByRole('button', { name: 'Spaces' });
    this.featureSets = page.getByRole('button', { name: 'FeatureSets' });
    this.clients = page.getByRole('button', { name: 'Clients' });
    this.settings = page.getByRole('button', { name: 'Settings' });
    this.spaceSwitcher = page.locator('[data-testid="space-switcher"]');
    this.themeToggle = page.locator('button[title*="mode"]');
  }

  async goToDashboard() {
    await this.dashboard.click();
  }

  async goToMyServers() {
    await this.myServers.click();
  }

  async goToDiscover() {
    await this.discover.click();
  }

  async goToSpaces() {
    await this.spaces.click();
  }

  async goToFeatureSets() {
    await this.featureSets.click();
  }

  async goToClients() {
    await this.clients.click();
  }

  async goToSettings() {
    await this.settings.click();
  }

  async toggleTheme() {
    await this.themeToggle.click();
  }
}
