const { test, expect } = require('@playwright/test');
const ModalInteractions = require('./modalInteractions');

test('Switch window handle', async ({ browser }) => {
    const context = await browser.newContext();
    const page = await context.newPage();
    await page.goto(URLS.GOOGLE);

    const modalInteractions = new ModalInteractions(page, context);

    const domain = await modalInteractions.getDomainFromNewPage();
    console.log(domain);

    const usernameInputValue = await modalInteractions.getUsernameInputValue();
    console.log(usernameInputValue);
});