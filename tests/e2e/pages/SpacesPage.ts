import { Page, Locator } from '@playwright/test';
import { BasePage } from './BasePage';

/**
 * Spaces management page object
 */
export class SpacesPage extends BasePage {
  readonly heading: Locator;
  readonly createSpaceButton: Locator;
  readonly spaceList: Locator;
  readonly spaceCards: Locator;

  constructor(page: Page) {
    super(page);
    this.heading = page.getByRole('heading', { name: 'Spaces' });
    this.createSpaceButton = page.getByRole('button', { name: /Create|New Space/i });
    this.spaceList = page.locator('[data-testid="space-list"]');
    this.spaceCards = page.locator('[data-testid="space-card"]');
  }

  async getSpaceCount(): Promise<number> {
    // Count space cards or list items
    const cards = this.page.locator('.space-card, [data-testid="space-card"]');
    return await cards.count();
  }

  async getSpaceByName(name: string): Locator {
    return this.page.locator(`text="${name}"`).first();
  }

  async createSpace(name: string) {
    await this.createSpaceButton.click();
    // Fill in the space name in the modal/form
    const nameInput = this.page.getByPlaceholder(/name/i);
    await nameInput.fill(name);
    await this.page.getByRole('button', { name: /Create|Save/i }).click();
  }

  async deleteSpace(name: string) {
    const spaceRow = this.page.locator(`text="${name}"`).first().locator('..');
    await spaceRow.getByRole('button', { name: /Delete/i }).click();
    // Confirm deletion
    await this.page.getByRole('button', { name: /Confirm|Yes/i }).click();
  }
}
