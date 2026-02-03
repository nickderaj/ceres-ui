import { test, expect } from '@playwright/test';

test.describe('StarField', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/#starfield');
  });

  test('renders stars', async ({ page }) => {
    const stars = page.locator('.ceres-star-field__star');
    await expect(stars.first()).toBeVisible({ timeout: 5000 });
    const count = await stars.count();
    expect(count).toBeGreaterThan(0);
    expect(count).toBeLessThanOrEqual(50);
  });

  test('star field container exists', async ({ page }) => {
    const field = page.locator('.ceres-star-field');
    await expect(field).toBeVisible();
  });

  // No screenshots — star positions are randomized on each render
});
