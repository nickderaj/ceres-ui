import { test, expect } from '@playwright/test';
import { setTheme } from './helpers';

test.describe('Badge', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/#badge');
  });

  test('renders all badge variants', async ({ page }) => {
    const badges = page.locator('.ceres-badge');
    await expect(badges).toHaveCount(9);
  });

  test('screenshot — dark', async ({ page }) => {
    const container = page.getByTestId('badge-page');
    await expect(container).toHaveScreenshot('badge-dark.png');
  });

  test('screenshot — light', async ({ page }) => {
    await setTheme(page, 'light');
    const container = page.getByTestId('badge-page');
    await expect(container).toHaveScreenshot('badge-light.png');
  });
});
