import { test, expect } from '@playwright/test';
import { setTheme } from './helpers';

test.describe('MarkdownRenderer', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/#markdown');
  });

  test('renders headings, code, table, and lists', async ({ page }) => {
    const article = page.locator('.ceres-markdown');
    await expect(article).toBeVisible();

    // Headings
    await expect(page.locator('h1')).toContainText('Markdown Renderer Demo');
    await expect(page.locator('h2').first()).toContainText('Introduction');

    // Code block
    const codeBlock = page.locator('.ceres-code-block');
    await expect(codeBlock).toBeVisible();

    // Table
    await expect(page.locator('table')).toBeVisible();

    // Lists
    await expect(page.locator('ul')).toBeVisible();
    await expect(page.locator('ol')).toBeVisible();
  });

  test('screenshot — dark', async ({ page }) => {
    const container = page.getByTestId('markdown-page');
    await expect(container).toHaveScreenshot('markdown-dark.png');
  });

  test('screenshot — light', async ({ page }) => {
    await setTheme(page, 'light');
    const container = page.getByTestId('markdown-page');
    await expect(container).toHaveScreenshot('markdown-light.png');
  });
});
