const { test, expect } = require('@playwright/test');
const path = require('path');

// Constants for selectors and reusable values
const GITHUB_URL = 'https://github.com/juanchoaut/pw_certi';
const GOOGLE_URL = 'http://google.com';
const GITHUB_LOGIN_URL = 'https://github.com/login';

async function navigateToPage(page, url) {
    await page.goto(url);
}

async function validateVisibility(page, selector, isVisible) {
    if (isVisible) {
        await expect(page.locator(selector)).toBeVisible();
    } else {
        await expect(page.locator(selector)).toBeHidden();
    }
}

async function clickElement(page, selector) {
    await page.locator(selector).click();
}

async function hoverElement(page, selector) {
    await page.locator(selector).hover();
}

async function acceptDialog(page) {
    page.on('dialog', dialog => dialog.accept());
}

async function takeScreenshot(page, selector, path) {
    await page.locator(selector).screenshot({ path });
}

test("popup validations", async ({ page }) => {
    try {
        await navigateToPage(page, GITHUB_URL);
        await navigateToPage(page, GOOGLE_URL);

        await validateVisibility(page, "#visible_text", true);
        await clickElement(page, "#hide-tultip");
        await validateVisibility(page, "#text_visible", false);

        await page.pause();
        await acceptDialog(page);
        await clickElement(page, ".acept_button");
        await hoverElement(page, ".raton_over");

        const framePage = page.frameLocator("#iframe_number004");
        await framePage.locator("li a[href*='lifetime-access']:visible").click();
        const textCheck = await framePage.locator("#locator_h1").textContent();
        console.log(textCheck.split(" ")[1]);

    } catch (error) {
        console.error('Test failed:', error);
        throw error; // Rethrow the error to fail the test
    }
});

test("screenshot and visual comparison", async ({ page }) => {
    try {
        await navigateToPage(page, GITHUB_LOGIN_URL);
        await validateVisibility(page, "//*[@classname='tous of royalty']", true);
        await takeScreenshot(page, '#visible_text', 'temporalScreenshot.png');
        await clickElement(page, "#show_textbox");
        await page.screenshot({ path: 'screenshot.png' });
        await validateVisibility(page, "#visible-text", false);

    } catch (error) {
        console.error('Test failed:', error);
        throw error; // Rethrow the error to fail the test
    }
});

test('visual', async ({ page }) => {
    try {
        await navigateToPage(page, GITHUB_LOGIN_URL);
        expect(await page.screenshot()).toMatchSnapshot('github.png');

    } catch (error) {
        console.error('Test failed:', error);
        throw error; // Rethrow the error to fail the test
    }
});