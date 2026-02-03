import { test, expect } from '@playwright/test';
import { setTheme } from './helpers';

const sections = [
  'showcase-badge',
  'showcase-callout',
  'showcase-codeblock',
  'showcase-datatable',
  'showcase-chart',
  'showcase-postcard',
  'showcase-backtotop',
  'showcase-starfield',
  'showcase-toc',
  'showcase-pdfdownload',
  'showcase-markdown',
];

test.describe('Showcase (integration)', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/#showcase');
  });

  test('all component sections are visible', async ({ page }) => {
    for (const id of sections) {
      await expect(page.getByTestId(id)).toBeVisible();
    }
  });

  test('full-page screenshot — dark', async ({ page }) => {
    // Wait for chart SVG to render
    const svg = page.locator('.ceres-chart svg.recharts-surface[role="application"]');
    await expect(svg).toBeVisible({ timeout: 10000 });
    await expect(page).toHaveScreenshot('showcase-dark.png', { fullPage: true });
  });

  test('full-page screenshot — light', async ({ page }) => {
    const svg = page.locator('.ceres-chart svg.recharts-surface[role="application"]');
    await expect(svg).toBeVisible({ timeout: 10000 });
    await setTheme(page, 'light');
    await expect(page).toHaveScreenshot('showcase-light.png', { fullPage: true });
  });

  test('theme toggle preserves all components', async ({ page }) => {
    const svg = page.locator('.ceres-chart svg.recharts-surface[role="application"]');
    await expect(svg).toBeVisible({ timeout: 10000 });

    // Switch to light and back
    await setTheme(page, 'light');
    for (const id of sections) {
      await expect(page.getByTestId(id)).toBeVisible();
    }

    await setTheme(page, 'dark');
    for (const id of sections) {
      await expect(page.getByTestId(id)).toBeVisible();
    }
  });
});
