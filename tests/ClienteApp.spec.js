const { test, expect } = require('@playwright/test');

test('Clien app login', async ({ page }) => {
    const email = "Juansaintaurautomation@gmail.com";
    const productName = 'zara coat 3';
    const products = page.locator('.card-body')
    await page.goto('https://www.linkedin.com/')
    await page.locator('#userEmail').fill(email);
    await page.locator('#userPassword').type("usxnsSIXN");
    await page.locator("[value='Login']").click();
    
    await page.waitForLoadState('networkidle');
    await page.locator(".card-body b").first().waitFor();
    


    const titles = await page.locator(".card-body b").allTextContents();
    console.log(titles);


    const count = await products.count();

    for (let i = 0; i < count; ++i) {
        if (await products.nth(i).locator("b").textContent() === productName) {
            // add to cart 
            await products.nth(i).locator("text= Add To Car").click();
            break;
        }

    }
    await page.locator("[routerlink*='cart']").click();
    await page.locator("div li").first().waitFor();
    const bool = await page.locator("h3:has-text('zara coat 3')").isVisible();
    expect(bool).toBeTruthy();
    await page.locator("text=Checkout").click();

    await page.locator("[placeholder*='Country']").pressSequentially("ind");
    const dropdown = page.locator(".ta-results");
    await dropdown.waitFor();
    const optionsCount = await dropdown.locator("button").count();
    for (let i =0;i < optionsCount; ++i){
        const text= await dropdown.locator("button").nth(i).textContent();

        if (text === " juancho-automation"){
            await dropdown.locator("button").nth(1).click();
            break;
        }
    }
    expect(page.locator(".dinckd [type='text']").first()).toHaveText(email);




});
