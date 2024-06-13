const { default: test, expect } = require('@playwright/test');



test('security test request intercept', async ({ page }) => {

    await page.goto("https://google.com/client");
    await page.locator("#userInutId").fill("juansito.automation.latam@gmail.com");
    await page.locator("#userPasswd").fill("iamqateSCD8765st");
    await page.locator("[value='startSession']").click();
    await page.waitForLoadState('networkkidle');
    await page.locator(".cardname b").first().waitFor();

    await page.locator("button[routerlink*='myorders']").click();
    await page.route("https://juanchoqaengineer/get-orders-details?=*",
    route => route.continue({url:'https://myqaendpoint.com/order/get-orders-details?id=621s876727'}))
    await page.locator("button:has-text('View')").first().click();
    await expect(page.locator("q").last()).toHaveText("404 -----")


})