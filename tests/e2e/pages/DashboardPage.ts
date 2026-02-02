import { Page, Locator, expect } from '@playwright/test';
import { BasePage } from './BasePage';

/**
 * Dashboard/Home page object
 */
export class DashboardPage extends BasePage {
  readonly heading: Locator;
  readonly gatewayStatus: Locator;
  readonly gatewayToggleButton: Locator;
  readonly serverCountCard: Locator;
  readonly featureSetsCard: Locator;
  readonly clientsCard: Locator;
  readonly activeSpaceCard: Locator;
  readonly configCopyButton: Locator;

  constructor(page: Page) {
    super(page);
    this.heading = page.getByRole('heading', { name: 'Dashboard' });
    this.gatewayStatus = page.locator('text=Gateway:').first();
    this.gatewayToggleButton = page.getByRole('button', { name: /Start|Stop/ });
    this.serverCountCard = page.locator('text=Servers').first();
    this.featureSetsCard = page.locator('text=FeatureSets').first();
    this.clientsCard = page.locator('text=Clients').first();
    this.activeSpaceCard = page.locator('text=Active Space').first();
    this.configCopyButton = page.getByRole('button', { name: /Copy/ });
  }

  async navigate() {
    await this.goto('/');
    await this.waitForLoad();
  }

  async isGatewayRunning(): Promise<boolean> {
    const text = await this.gatewayStatus.textContent();
    return text?.includes('Running') ?? false;
  }

  async toggleGateway() {
    await this.gatewayToggleButton.click();
    // Wait for status to change
    await this.page.waitForTimeout(500);
  }

  async getServerCount(): Promise<string> {
    const card = this.page.locator('text=Connected / Installed').locator('..');
    const countText = await card.locator('.text-3xl').textContent();
    return countText || '0/0';
  }

  async copyConfig() {
    await this.configCopyButton.click();
  }
}
