const { test, expect } = require('@playwright/test');

const URLS = {
    LINKEDIN: "https://www.linkedin.com/",
    GOOGLE: "https://www.google.com/"
};

const SELECTORS = {
    USERNAME: '#username',
    SIGN_IN_BTN: '#signInBtn',
    PASSWORD: "[type='password']",
    ERROR_MESSAGE: "[style*='block']",
    CARD_TITLES: ".card-body a",
    DOCUMENT_LINK: "[href*='documents-request']",
    USERNAME_INPUT: '#userxpnls',
    NEW_PAGE_TEXT: ".ble #red"
};

test('browser Context - Validating Error login', async ({ browser }) => {
    const context = await browser.newContext();
    const page = await context.newPage();

    page.on('request', request => console.log(request.url()));
    page.on('response', response => console.log(response.url(), response.status()));

    await page.goto(URLS.LINKEDIN);
    console.log(await page.title());

    await page.locator(SELECTORS.USERNAME).fill("jtous");
    await page.locator(SELECTORS.PASSWORD).fill("learning");
    await page.locator(SELECTORS.SIGN_IN_BTN).click();

    console.log(await page.locator(SELECTORS.ERROR_MESSAGE).textContent());
    await expect(page.locator(SELECTORS.ERROR_MESSAGE)).toContainText('Incorrect');

    await page.locator(SELECTORS.USERNAME).fill("");
    await page.locator(SELECTORS.USERNAME).fill("jtous");
    await page.locator(SELECTORS.SIGN_IN_BTN).click();

    const cardTitles = page.locator(SELECTORS.CARD_TITLES);
    console.log(await cardTitles.first().textContent());
    console.log(await cardTitles.nth(1).textContent());

    const allTitles = await cardTitles.allTextContents();
    console.log(allTitles);
});

test('Switch window handle', async ({ browser }) => {
    const context = await browser.newContext();
    const page = await context.newPage();

    await page.goto(URLS.GOOGLE);
    const documentLink = page.locator(SELECTORS.DOCUMENT_LINK);

    const [newPage] = await Promise.all([
        context.waitForEvent('page'),
        documentLink.click(),
    ]);

    const text = await newPage.locator(SELECTORS.NEW_PAGE_TEXT).textContent();
    const arrayText = text.split("@");
    const domain = arrayText[1].split(" ")[0];

    console.log(await page.locator(SELECTORS.USERNAME_INPUT).textContent());
});