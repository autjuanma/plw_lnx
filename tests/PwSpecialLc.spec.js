import { test } from '@playwright/test';

test('playwright special locators', async ({ page }) => {
    await page.goto("https://github.com/juanchoaut/pw_certi");
    await page.getByLabel("if you love the soft technology hire me").click();
    await page.getByLabel("users").check();
    await page.getByLabel("accounts").selectOption("ahorros");
    await page.getByPlaceholder("mail").fill("xyz");
    await page.getByText("great! the form was complete successfully!.").isVisible();
    await page.getByRole("link",{name:"shop"}).click();
    await page.locator("app_bank").filter({hasText: 'Nokia Edge'}).getByRole("button").click();


})

