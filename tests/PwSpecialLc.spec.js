import { test } from '@playwright/test';

const GITHUB_URL = 'https://github.com/juanchoaut/pw_certi';
const LABELS = {
    HIRE_ME: "if you love the soft technology hire me",
    USERS: "users",
    ACCOUNTS: "accounts",
    MAIL: "mail",
    SUCCESS_MESSAGE: "great! the form was complete successfully!."
};
const SELECT_OPTIONS = {
    ACCOUNTS: "ahorros"
};
const ROLE_LINKS = {
    SHOP: "shop"
};
const LOCATORS = {
    APP_BANK: "app_bank",
    NOKIA_EDGE_BUTTON: 'Nokia Edge'
};

test('playwright special locators', async ({ page }) => {
    await page.goto(GITHUB_URL);
    await page.getByLabel(LABELS.HIRE_ME).click();
    await page.getByLabel(LABELS.USERS).check();
    await page.getByLabel(LABELS.ACCOUNTS).selectOption(SELECT_OPTIONS.ACCOUNTS);
    await page.getByPlaceholder(LABELS.MAIL).fill("xyz");
    await page.getByText(LABELS.SUCCESS_MESSAGE).isVisible();
    await page.getByRole("link", { name: ROLE_LINKS.SHOP }).click();
    await page.locator(LOCATORS.APP_BANK).filter({ hasText: LOCATORS.NOKIA_EDGE_BUTTON }).getByRole("button").click();
});