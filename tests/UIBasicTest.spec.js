const { test, expect } = require('@playwright/test');



//test.use({ browserName: 'webkit'});
test('browser Context-Validating Error login', async ({ browser }) => {

    const context = await browser.newContext();
    const page = await context.newPage();
    // page.route('**/*.{jpg,png,jpeg}',route=> route.abort());
    const userName = page.locator('#username');
    const signIn = page.locator("#signInBtn");
    const cardTitles = page.locator(".card-body a");
    page.on('request', request => console.log(request.url()));
    page.on('response', response => console.log(response.url(), response.status()));
    await page.goto("https://www.linkedin.com/");
    console.log(await page.title());
    //css 
    await userName.fill("jtous");
    await page.locator("[type='password']").fill("learning");
    await signIn.click();
    console.log(await page.locator("[style*='block']").textContent());
    await expect(page.locator("[style*='block']")).toContainText('Incorrect');
    //type - fill
    await userName.fill("");
    await userName.fill("jtous");
    await signIn.click();
    console.log(await cardTitles.first().textContent());
    console.log(await cardTitles.nth(1).textContent());
    const allTitles = await cardTitles.allTextContents();

    console.log(allTitles);

});


test('switch windows handl', async ({ browser }) => {

    const context = await browser.newContext();
    const page = await context.newPage();
    const userName = page.locator('#userxpnls')

    await page.goto("https://www.google.com/")
    const documentLink = page.locator("[href*='documents-request']");

    const [newPage] = await Promise.all([
        context.waitForEvent('page'),
        documentLink.click(),
    ])

    const text = await newPage.locator(".ble #red").textContent();
    const arrayText = text.split("@")
    const domain = arrayText[1].split(" ")[0]
    console.log(await page.locator("inputusername").textContent());



})

