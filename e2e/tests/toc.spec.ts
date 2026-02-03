import { test, expect } from '@playwright/test';
import { setTheme } from './helpers';

test.describe('TableOfContents', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/#toc');
  });

  test('renders 5 items', async ({ page }) => {
    const links = page.locator('.ceres-toc__link');
    await expect(links).toHaveCount(5);
    await expect(links.first()).toContainText('Introduction');
  });

  test('screenshot — dark', async ({ page }) => {
    const container = page.getByTestId('toc-page');
    await expect(container).toHaveScreenshot('toc-dark.png');
  });

  test('screenshot — light', async ({ page }) => {
    await setTheme(page, 'light');
    const container = page.getByTestId('toc-page');
    await expect(container).toHaveScreenshot('toc-light.png');
  });
});
