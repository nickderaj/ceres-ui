import { test, expect } from '@playwright/test';
import { setTheme } from './helpers';

test.describe('PostCard', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/#postcard');
  });

  test('renders two post cards', async ({ page }) => {
    const cards = page.locator('.ceres-post-card');
    await expect(cards).toHaveCount(2);
    await expect(cards.first()).toContainText('Building a Component Library');
  });

  test('screenshot — dark', async ({ page }) => {
    const container = page.getByTestId('postcard-page');
    await expect(container).toHaveScreenshot('postcard-dark.png');
  });

  test('screenshot — light', async ({ page }) => {
    await setTheme(page, 'light');
    const container = page.getByTestId('postcard-page');
    await expect(container).toHaveScreenshot('postcard-light.png');
  });
});
