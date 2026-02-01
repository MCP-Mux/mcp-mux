/**
 * Tauri E2E tests using WebdriverIO
 * 
 * These tests run against the actual built Tauri application,
 * not the web-only dev server.
 */

describe('McpMux Application', () => {
  it('should launch and show main window', async () => {
    // Wait for app to load
    await browser.pause(2000);

    // Check window title
    const title = await browser.getTitle();
    expect(title).toBe('McpMux');
  });

  it('should display sidebar navigation', async () => {
    const sidebar = await $('nav');
    await expect(sidebar).toBeDisplayed();
  });

  it('should show Servers tab', async () => {
    const serversButton = await $('button*=Servers');
    await expect(serversButton).toBeDisplayed();
  });

  it('should show Discover tab', async () => {
    const discoverButton = await $('button*=Discover');
    await expect(discoverButton).toBeDisplayed();
  });

  it('should navigate to Discover page', async () => {
    const discoverButton = await $('button*=Discover');
    await discoverButton.click();

    const heading = await $('h1*=Discover');
    await expect(heading).toBeDisplayed();
  });

  it('should show search input on Discover page', async () => {
    const searchInput = await $('input[placeholder*="Search"]');
    await expect(searchInput).toBeDisplayed();
  });

  it('should navigate to Servers page', async () => {
    const serversButton = await $('button*=Servers');
    await serversButton.click();

    // Should show either servers list or empty state
    const pageContent = await $('main');
    await expect(pageContent).toBeDisplayed();
  });

  it('should navigate to Clients page', async () => {
    const clientsButton = await $('button*=Clients');
    await clientsButton.click();

    const heading = await $('h1*=Clients');
    await expect(heading).toBeDisplayed();
  });

  it('should navigate to Feature Sets page', async () => {
    const featuresButton = await $('button*=Feature Sets');
    await featuresButton.click();

    const heading = await $('h1*=Feature Sets');
    await expect(heading).toBeDisplayed();
  });

  it('should show space switcher', async () => {
    // Look for space indicator or switcher
    const spaceSwitcher = await $('[data-testid="space-switcher"], button*=Space');
    await expect(spaceSwitcher).toBeDisplayed();
  });
});

describe('Registry/Discover Functionality', () => {
  beforeEach(async () => {
    // Navigate to discover page
    const discoverButton = await $('button*=Discover');
    await discoverButton.click();
    await browser.pause(500);
  });

  it('should display server cards', async () => {
    // Wait for servers to load
    await browser.pause(2000);

    // Check for server cards or grid
    const serverCards = await $$('[class*="rounded"][class*="border"]');
    expect(serverCards.length).toBeGreaterThan(0);
  });

  it('should filter servers when searching', async () => {
    const searchInput = await $('input[placeholder*="Search"]');
    await searchInput.setValue('github');

    // Wait for filter
    await browser.pause(500);

    // Results should be filtered
    const serverCount = await $('text=/\\d+ servers?/');
    await expect(serverCount).toBeDisplayed();
  });

  it('should clear search', async () => {
    const searchInput = await $('input[placeholder*="Search"]');
    await searchInput.setValue('test');
    await browser.pause(300);

    // Clear the search
    await searchInput.clearValue();
    await browser.pause(300);

    // Should show all servers again
    const serverCount = await $('text=/\\d+ servers?/');
    await expect(serverCount).toBeDisplayed();
  });
});
