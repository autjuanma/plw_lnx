require('dotenv').config();
const { test, expect } = require('@playwright/test');

// Load environment variables
const URL = process.env.URL;
const EMAIL = process.env.EMAIL;
const PASSWORD = process.env.PASSWORD;
const PRODUCT_NAME = process.env.PRODUCT_NAME;
const COUNTRY_NAME = process.env.COUNTRY_NAME;

async function login(page) {
    await page.goto(URL);
    await page.fill('#userEmail', EMAIL);
    await page.fill('#userPassword', PASSWORD);
    await page.click("[value='Login']");
    await page.waitForLoadState('networkidle');
}

async function addProductToCart(page) {
    const products = page.locator('.card-body');
    const count = await products.count();

    for (let i = 0; i < count; ++i) {
        const productTitle = await products.nth(i).locator("b").textContent();
        if (productTitle === PRODUCT_NAME) {
            await products.nth(i).locator("text= Add To Car").click();
            break;
        }
    }
}

async function selectCountry(page) {
    await page.locator("[placeholder*='Country']").pressSequentially("ind");
    const dropdown = page.locator(".ta-results");
    await dropdown.waitFor();

    const optionsCount = await dropdown.locator("button").count();
    for (let i = 0; i < optionsCount; ++i) {
        const text = await dropdown.locator("button").nth(i).textContent();
        if (text === COUNTRY_NAME) {
            await dropdown.locator("button").nth(i).click();
            break;
        }
    }
}

test('Client app login', async ({ page }) => {
    try {
        await login(page);
        
        const titles = await page.locator(".card-body b").allTextContents();
        console.log(titles);

        await addProductToCart(page);
        await page.locator("[routerlink*='cart']").click();
        await page.locator("div li").first().waitFor();

        const isProductVisible = await page.locator("h3:has-text('zara coat 3')").isVisible();
        expect(isProductVisible).toBeTruthy();

        await page.locator("text=Checkout").click();
        await selectCountry(page);

        const emailVisible = await page.locator(".dinckd [type='text']").first().textContent();
        expect(emailVisible).toContain(EMAIL);
        
    } catch (error) {
        console.error('Test failed:', error);
        throw error; // Rethrow the error to fail the test
    }
});