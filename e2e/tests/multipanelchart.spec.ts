import { test, expect } from '@playwright/test';
import { setTheme } from './helpers';

test.describe('MultiPanelChart', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/#multipanelchart');
  });

  test('renders SVG charts', async ({ page }) => {
    const svgs = page.locator('svg.recharts-surface[role="application"]');
    await expect(svgs.first()).toBeVisible({ timeout: 10000 });
    await expect(svgs).toHaveCount(3);
  });

  test('screenshot — dark', async ({ page }) => {
    const svg = page.locator('svg.recharts-surface[role="application"]').first();
    await expect(svg).toBeVisible({ timeout: 10000 });
    const container = page.getByTestId('multipanelchart-page');
    await expect(container).toHaveScreenshot('multipanelchart-dark.png');
  });

  test('screenshot — light', async ({ page }) => {
    const svg = page.locator('svg.recharts-surface[role="application"]').first();
    await expect(svg).toBeVisible({ timeout: 10000 });
    await setTheme(page, 'light');
    const container = page.getByTestId('multipanelchart-page');
    await expect(container).toHaveScreenshot('multipanelchart-light.png');
  });
});
