import { test, expect } from '@playwright/test';
import { setTheme } from './helpers';

test.describe('CodeBlock', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/#codeblock');
  });

  test('renders code with syntax highlighting', async ({ page }) => {
    const codeBlock = page.locator('.ceres-code-block');
    await expect(codeBlock).toBeVisible();
    await expect(codeBlock).toContainText('interface User');
  });

  test('screenshot — dark', async ({ page }) => {
    const container = page.getByTestId('codeblock-page');
    await expect(container).toHaveScreenshot('codeblock-dark.png');
  });

  test('screenshot — light', async ({ page }) => {
    await setTheme(page, 'light');
    const container = page.getByTestId('codeblock-page');
    await expect(container).toHaveScreenshot('codeblock-light.png');
  });
});
