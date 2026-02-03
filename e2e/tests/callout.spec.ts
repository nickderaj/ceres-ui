import { test, expect } from '@playwright/test';
import { setTheme } from './helpers';

test.describe('Callout', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/#callout');
  });

  test('renders all 7 callout variants', async ({ page }) => {
    const callouts = page.locator('.ceres-callout');
    await expect(callouts).toHaveCount(7);
  });

  test('screenshot — dark', async ({ page }) => {
    const container = page.getByTestId('callout-page');
    await expect(container).toHaveScreenshot('callout-dark.png');
  });

  test('screenshot — light', async ({ page }) => {
    await setTheme(page, 'light');
    const container = page.getByTestId('callout-page');
    await expect(container).toHaveScreenshot('callout-light.png');
  });
});
