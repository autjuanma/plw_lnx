const { test, expect } = require('@playwright/test');

const GOOGLE_CLIENT_URL = 'https://google.com/client';
const USER_EMAIL = 'juansito.automation.latam@gmail.com';
const USER_PASSWORD = 'iamqateSCD8765st';

test('security test request intercept', async ({ page }) => {
    try {
        await page.goto(GOOGLE_CLIENT_URL);
        await page.locator("#userInutId").fill(USER_EMAIL);
        await page.locator("#userPasswd").fill(USER_PASSWORD);
        await page.locator("[value='startSession']").click();
        await page.waitForLoadState('networkidle');
        await page.locator(".cardname b").first().waitFor();

        await page.locator("button[routerlink*='myorders']").click();
        await page.route("https://juanchoqaengineer/get-orders-details?=*",
            route => route.continue({ url: 'https://myqaendpoint.com/order/get-orders-details?id=621s876727' })
        );
        await page.locator("button:has-text('View')").first().click();
        await expect(page.locator("q").last()).toHaveText("404 -----");

    } catch (error) {
        console.error('Test failed:', error);
        throw error; // Rethrow the error to fail the test
    }
});