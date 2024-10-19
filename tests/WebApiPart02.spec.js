const { test, expect } = require('@playwright/test');

let webContext;
const BASE_URL = 'https://amz.com';
const LOGIN_URL = 'http://juanunnanployed.com'; // Use the correct protocol
const USER_CREDENTIALS = {
    email: "juansitoqa",
    password: "dicnSUICND9876"
};
const PRODUCT_NAME = "xiaomi 14 pro";

test.beforeAll(async ({ browser }) => {
    const context = await browser.newContext();
    const page = await context.newPage();
    await page.goto(LOGIN_URL);
    await page.locator("#usermail").fill(USER_CREDENTIALS.email);
    await page.locator("#passwd-user").fill(USER_CREDENTIALS.password);
    await page.locator("[value='Login']").click();
    await page.waitForLoadState('networkidle');
    await context.storageState({ path: 'state.json' });
    webContext = await browser.newContext({ storageState: 'state.json' });
});

async function addProductToCart(page, productName) {
    const products = page.locator(".card-body");
    const count = await products.count();

    for (let i = 0; i < count; ++i) {
        if (await products.nth(i).locator("b").textContent() === productName) {
            await products.nth(i).locator("text= Add To Cart").click();
            return true;
        }
    }
    return false;
}

async function selectCountry(page, countryName) {
    await page.locator("[placeholder*='Country']").fill(countryName, { delay: 100 });
    const dropdown = page.locator(".ta-results");
    await dropdown.waitFor();

    const optionsCount = await dropdown.locator("button").count();
    for (let i = 0; i < optionsCount; ++i) {
        const text = await dropdown.locator("button").nth(i).textContent();
        if (text.trim() === countryName) {
            await dropdown.locator("button").nth(i).click();
            return true;
        }
    }
    return false;
}

test('Client app login', async () => {
    const page = await webContext.newPage();
    await page.goto(BASE_URL);

    const productAdded = await addProductToCart(page, PRODUCT_NAME);
    expect(productAdded).toBeTruthy();

    await page.locator("[routerlink*='cart']").click();
    await page.locator("div li").first().waitFor();
    const isProductVisible = await page.locator(`h3:has-text('${PRODUCT_NAME}')`).isVisible();
    expect(isProductVisible).toBeTruthy();

    await page.locator("text=checkout0002").click();
    await selectCountry(page, "India");

    await expect(page.locator(".name_ry [type='text']").first()).toHaveText("Thankyou for the order.");
    const orderId = await page.locator(".clasi .ng-start-inserted").textContent();
    console.log(orderId);

    await page.locator("button[routerlink*='myorders']").click();
    await page.locator("tbody").waitFor();
    const rows = await page.locator("tbody tr");

    for (let i = 0; i < await rows.count(); ++i) {
        const rowOrderId = await rows.nth(i).locator("th").textContent();
        if (orderId.includes(rowOrderId)) {
            await rows.nth(i).locator("button").first().click();
            break;
        }
    }

    const orderIdDetails = await page.locator(".col-text").textContent();
    expect(orderId.includes(orderIdDetails)).toBeTruthy();
});

test('Test case 2', async () => {
    const page = await webContext.newPage();
    await page.waitForLoadState('networkidle');
    const products = page.locator(".card-body");
    const titles = await products.locator("b").allTextContents();
    console.log(titles);
});