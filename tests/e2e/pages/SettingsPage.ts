import { Page, Locator } from '@playwright/test';
import { BasePage } from './BasePage';

/**
 * Settings page object
 */
export class SettingsPage extends BasePage {
  readonly heading: Locator;
  readonly lightThemeButton: Locator;
  readonly darkThemeButton: Locator;
  readonly systemThemeButton: Locator;
  readonly openLogsButton: Locator;
  readonly logsPath: Locator;

  constructor(page: Page) {
    super(page);
    this.heading = page.getByRole('heading', { name: 'Settings' });
    this.lightThemeButton = page.getByRole('button', { name: 'Light' });
    this.darkThemeButton = page.getByRole('button', { name: 'Dark' });
    this.systemThemeButton = page.getByRole('button', { name: 'System' });
    this.openLogsButton = page.getByRole('button', { name: /Open Logs/i });
    this.logsPath = page.locator('.font-mono').filter({ hasText: /logs|mcpmux/i });
  }

  async selectTheme(theme: 'light' | 'dark' | 'system') {
    switch (theme) {
      case 'light':
        await this.lightThemeButton.click();
        break;
      case 'dark':
        await this.darkThemeButton.click();
        break;
      case 'system':
        await this.systemThemeButton.click();
        break;
    }
  }

  async getActiveTheme(): Promise<string> {
    // Check which button has the primary variant
    if (await this.lightThemeButton.getAttribute('class').then(c => c?.includes('primary'))) {
      return 'light';
    }
    if (await this.darkThemeButton.getAttribute('class').then(c => c?.includes('primary'))) {
      return 'dark';
    }
    return 'system';
  }
}
