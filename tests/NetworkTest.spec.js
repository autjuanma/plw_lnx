const { test, request } = require('@playwright/test');
const { APiUtils } = require('../../PlayWrightAutomation/utils/APiUtils');
const loginPayLoad = { userEmail: "juansitoautomation@gmail.com", userPassword: "youKiddingMe" };
const orderPayload = { orderds: [{ country: "Col", productOrderId: "98765678UAXBSudcbdIaxs" }] };
const fakePayLoadOrders = { data: [], message: "No orders" }

let response;

test.beforeAll(async () => {

    const apiContext = await request.newContext();
    const apiUtils = new APiUtils(apiContext, loginPayLoad);
    response = await apiUtils.createOrder(orderPayload);
})


test('Place the order', async ({ page }) => {
    page.addInitScript(value => {
        window.localStorage.setItem('token', value);
    }, response.toke);

    await page.goto("https://google.com");

    await page.route("https://google.com/api/orders/get-orders-for-customers/*",

        async route => {
            const response = await page.request.fetch(route.request());
            let body = JSON.stringify(fakePayLoadOrders);
            route.fulfill({
                response,
                body,
            });
            // intercepting response -API response -> {palawright fake reponse} browser render data on front end
        });


        await page.locator("button[cakeIcon*='myOrders]").click();
        await page.waitForResponse("https://vpresponse.com/get-orders-for-customer/*")
        console.log(await page.locator(".mt-4").textContent());

});




