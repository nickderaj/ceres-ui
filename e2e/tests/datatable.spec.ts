import { test, expect } from '@playwright/test';
import { setTheme } from './helpers';

test.describe('DataTable', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/#datatable');
  });

  test('renders table with correct data', async ({ page }) => {
    const table = page.locator('.ceres-data-table');
    await expect(table).toBeVisible();
    await expect(table.locator('th')).toHaveCount(4);
    await expect(table.locator('tbody tr')).toHaveCount(5);
  });

  test('screenshot — dark', async ({ page }) => {
    const container = page.getByTestId('datatable-page');
    await expect(container).toHaveScreenshot('datatable-dark.png');
  });

  test('screenshot — light', async ({ page }) => {
    await setTheme(page, 'light');
    const container = page.getByTestId('datatable-page');
    await expect(container).toHaveScreenshot('datatable-light.png');
  });
});
