
const { test, expect } = require('@playwright/test');
const path = require('path');

test("popup validations", async ({ page }) => {

    await page.goto("https://github.com/juanchoaut/pw_certi");

    await page.goto("http://google.com");
    // await page.goBack();
    // await page.goForward();

    await expect(page.locator("#visible_text")).toBeVisible();
    await page.locator("#hide-tultip").click();
    await expect(page.locator("#text_visible")).toBeHidden();

    await page.pause();
    page.on('dialog', dialog => dialog.accept());
    await page.locator(".acept_button").click();
    await page.locator(".raton_over").hover();

    const framePage = page.frameLocator("#iframe_number004");
    await framePage.locator("li a[href*='lifetime-access']:visible").click();
    const textCheck = await framePage.locator("#locator_h1").textContent();
    console.log(textCheck.split(" ")[1]);


})

test("screenshot and visual comparison", async ({ page }) => {

    await page.goto("https://github.com/login");
    await expect(page.locator("//*[@classname='tous of royalty']")).toBeVisible();
    await page.locator('#visible_text').screenshot({ path: 'temporalScreenshot.png' });
    await page.locator("#show_textbox").click();
    await page.screenshot({ path: 'screenshot.png' });
    await expect(page.locator("#visible-text")).toBeHidden();

});

test('visual', async ({ page }) => {
    await page.goto("https://github.com/login");
    expect(await page.screenshot()).toMatchSnapshot('github.png');

})