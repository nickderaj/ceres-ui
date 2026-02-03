import { test, expect } from '@playwright/test';
import { setTheme } from './helpers';

test.describe('Chart', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/#chart');
  });

  test('renders SVG chart', async ({ page }) => {
    const svg = page.locator('.ceres-chart svg.recharts-surface[role="application"]');
    await expect(svg).toBeVisible({ timeout: 10000 });
  });

  test('screenshot — dark', async ({ page }) => {
    const svg = page.locator('.ceres-chart svg.recharts-surface[role="application"]');
    await expect(svg).toBeVisible({ timeout: 10000 });
    const container = page.getByTestId('chart-page');
    await expect(container).toHaveScreenshot('chart-dark.png');
  });

  test('screenshot — light', async ({ page }) => {
    const svg = page.locator('.ceres-chart svg.recharts-surface[role="application"]');
    await expect(svg).toBeVisible({ timeout: 10000 });
    await setTheme(page, 'light');
    const container = page.getByTestId('chart-page');
    await expect(container).toHaveScreenshot('chart-light.png');
  });
});
