import { test, expect } from '@playwright/test';

test('should be able to search for a job', async ({ page }) => {
  test.setTimeout(600000); // 600 seconds for this test

  await page.goto('https://www.instahyre.com/login/');
  await page.getByLabel('Email').click();
  await page.getByLabel('Email').fill('gautamkhattri07@gmail.com');
  await page.getByLabel('Email').press('Tab');
  await page.getByLabel('Password').fill('Gautam4@');
  await page.getByRole('button', { name: 'Login' }).click();
  await page.getByPlaceholder('e.g. 4').click();
  await page.getByPlaceholder('e.g. 4').fill('2');
  await page.getByRole('button', { name: 'Show results' }).click();
  await page.locator('#interested-btn').first().click();

  // Function to wait for the button to become enabled and click it
  async function clickApplyButton() {
    await page.waitForFunction(() => {
      const button = document.querySelector('button.btn-primary.new-btn');
      return button && !button.disabled;
    }, { timeout: 30000 });

    await page.getByRole('button', { name: 'Apply' }).click();
  }

  // Attempt to click the apply button several times
  for (let i = 0; i < 100; i++) {
    await clickApplyButton();
  }
});
