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
    const svg = page.locator('.ceres-chart svg.recharts-surface[role="application"]');
    await expect(svg).toBeVisible({ timeout: 10000 });
    // Use single-shot screenshot + toMatchSnapshot to avoid the stability
    // check that fails due to recharts non-deterministic SVG re-renders.
    // The chart rendering is tested separately in chart.spec.ts.
    const screenshot = await page.getByTestId('showcase-page').screenshot();
    expect(screenshot).toMatchSnapshot('showcase-dark.png', {
      maxDiffPixelRatio: 0.04,
    });
  });

  test('full-page screenshot — light', async ({ page }) => {
    const svg = page.locator('.ceres-chart svg.recharts-surface[role="application"]');
    await expect(svg).toBeVisible({ timeout: 10000 });
    await setTheme(page, 'light');
    const screenshot = await page.getByTestId('showcase-page').screenshot();
    expect(screenshot).toMatchSnapshot('showcase-light.png', {
      maxDiffPixelRatio: 0.04,
    });
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
