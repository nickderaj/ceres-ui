import { test, expect } from '@playwright/test';
import { setTheme } from './helpers';

test.describe('PdfDownloadButton', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/#pdfdownload');
  });

  test('renders enabled button', async ({ page }) => {
    const button = page.locator('.ceres-pdf-button');
    await expect(button).toBeVisible();
    await expect(button).toBeEnabled();
  });

  // No click test — triggers system print dialog which would hang

  test('screenshot — dark', async ({ page }) => {
    const container = page.getByTestId('pdfdownload-page');
    await expect(container).toHaveScreenshot('pdfdownload-dark.png');
  });

  test('screenshot — light', async ({ page }) => {
    await setTheme(page, 'light');
    const container = page.getByTestId('pdfdownload-page');
    await expect(container).toHaveScreenshot('pdfdownload-light.png');
  });
});
