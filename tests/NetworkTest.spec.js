// test.js
const { test, request } = require('@playwright/test');
const { APiUtils } = require('../../PlayWrightAutomation/utils/APiUtils');
const { API_URL, LOGIN_URL, ORDERS_URL, GOOGLE_URL, VPRESPONSE_URL } = require('./constants');
const { LOGIN_PAYLOAD } = require('./credentials');
const { ORDER_PAYLOAD } = require('./orderDetails');
const { FAKE_PAYLOAD_ORDERS } = require('./fakeData');

let response;

test.beforeAll(async () => {
    const apiContext = await request.newContext();
    const apiUtils = new APiUtils(apiContext, LOGIN_PAYLOAD);
    response = await apiUtils.createOrder(ORDER_PAYLOAD);
});

test('Place the order', async ({ page }) => {
    // Set token in local storage
    page.addInitScript(value => {
        window.localStorage.setItem('token', value);
    }, response.token);

    await page.goto(GOOGLE_URL);

    // Intercept the API request and respond with fake data
    await page.route(`${GOOGLE_URL}/api/orders/get-orders-for-customers/*`, async route => {
        const apiResponse = await page.request.fetch(route.request());
        const body = JSON.stringify(FAKE_PAYLOAD_ORDERS);
        route.fulfill({
            response: apiResponse,
            body,
        });
    });

    // Click on the "My Orders" button and wait for the response
    await page.locator("button[cakeIcon*='myOrders']").click();
    await page.waitForResponse(`${VPRESPONSE_URL}/get-orders-for-customer/*`);
    console.log(await page.locator(".mt-4").textContent());
});