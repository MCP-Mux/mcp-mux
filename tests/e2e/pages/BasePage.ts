import { Page, Locator } from '@playwright/test';

/**
 * Base Page Object class with common functionality
 */
export abstract class BasePage {
  readonly page: Page;
  readonly loadingIndicator: Locator;
  readonly errorMessage: Locator;

  constructor(page: Page) {
    this.page = page;
    this.loadingIndicator = page.getByTestId('loading');
    this.errorMessage = page.getByRole('alert');
  }

  /**
   * Navigate to a URL
   */
  async goto(path: string = '/') {
    await this.page.goto(path);
    await this.waitForLoad();
  }

  /**
   * Wait for the page to finish loading
   */
  async waitForLoad() {
    await this.page.waitForLoadState('networkidle');
  }

  /**
   * Wait for loading indicator to disappear
   */
  async waitForLoadingComplete() {
    await this.loadingIndicator.waitFor({ state: 'hidden', timeout: 10000 }).catch(() => {
      // Loading indicator might not exist, that's OK
    });
  }

  /**
   * Check if an error message is displayed
   */
  async hasError(): Promise<boolean> {
    return await this.errorMessage.isVisible().catch(() => false);
  }

  /**
   * Get the error message text
   */
  async getErrorText(): Promise<string | null> {
    if (await this.hasError()) {
      return await this.errorMessage.textContent();
    }
    return null;
  }

  /**
   * Take a screenshot for debugging
   */
  async screenshot(name: string) {
    await this.page.screenshot({ path: `./reports/screenshots/${name}.png` });
  }
}
