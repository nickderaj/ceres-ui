import { test, expect } from '@playwright/test';
import { setTheme } from './helpers';

test.describe('BackToTopButton', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/#backtotop');
  });

  test('renders visible button', async ({ page }) => {
    const button = page.locator('.ceres-back-to-top');
    await expect(button).toBeVisible();
  });

  test('screenshot — dark', async ({ page }) => {
    const container = page.getByTestId('backtotop-page');
    await expect(container).toHaveScreenshot('backtotop-dark.png');
  });

  test('screenshot — light', async ({ page }) => {
    await setTheme(page, 'light');
    const container = page.getByTestId('backtotop-page');
    await expect(container).toHaveScreenshot('backtotop-light.png');
  });
});
