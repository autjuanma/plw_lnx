const { test, request, expect } = require('@playwright/test');
const { APiUtils } = require('../utils/api/ApiUtils');
const loginPayload = { userEmail: "Juansaintaurautomation@gmail.com", userPassword: "IamEngineer" };
const orderPayload = { orders: [{ country: "col", productOrderId: "876567898cdUSCNDUCuscxdsbcd" }] };

let response;
test.beforeAll(async () => {
    const apiContext = await request.newContext();
    const apiUtils = new APiUtils(apiContext, loginPayload);
    response = await apiUtils.createOrder(orderPayload);

})

// create order is success

test('Place the order', async ({ page }) => {
    page.addInitScript(value => {
        window.localStorage.setItem('token', value);

    }, response.token);
    await page.goto("");
    await page.locator("button[routerLink*='myorders']").click();
    await page.locator("tbody").waitFor();
    const rows = await page.locator("tbody tr");

    for (let i = 0; i < await rows.count(); ++i) {
        const rowOrderId = await rows.nth(i).locator("th").textContent();
        if (response.orderId.includes(rowOrderId)) {
            await rows.nth(i).locator("button").first().click();
            break;
        }
    }

    const orderIdDetails = await page.locator(".col-text").textContent();

    expect(response.orderId.includes(orderIdDetails)).toBeTruthy();


})

