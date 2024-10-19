const { test, expect } = require('@playwright/test');

test.describe('Network Interactions', () => {
    let page;

    test.beforeAll(async ({ browser }) => {
        const context = await browser.newContext();
        page = await context.newPage();
        await page.goto('https://example.com'); // Replace with your target URL
    });

    test('Intercept and log network requests', async () => {
        await page.route('**/*', (route, request) => {
            console.log(`Request made: ${request.method()} ${request.url()}`);
            route.continue(); // Continue with the request
        });

        // Trigger some network activity
        await page.click('text=Some Link'); // Adjust selector as needed
        await page.waitForLoadState('networkidle'); // Wait for network to settle
    });

    test('Mock network response', async () => {
        await page.route('**/api/data', (route) => {
            const mockResponse = {
                data: [{ id: 1, name: 'Mock Item' }],
            };
            route.fulfill({
                contentType: 'application/json',
                body: JSON.stringify(mockResponse),
            });
        });

        // Perform action that triggers the API call
        const response = await page.evaluate(async () => {
            const res = await fetch('/api/data');
            return res.json();
        });

        // Validate the mocked response
        expect(response.data).toEqual([{ id: 1, name: 'Mock Item' }]);
    });

    test('Simulate slow network conditions', async () => {
        await page.route('**/*', (route) => {
            // Simulate a slow network by delaying the response
            setTimeout(() => route.continue(), 2000); // 2 seconds delay
        });

        const start = Date.now();
        await page.goto('https://example.com'); // Adjust URL as needed
        const duration = Date.now() - start;

        // Check if the navigation took longer than expected
        expect(duration).toBeGreaterThan(2000); // Ensure it took longer than 2 seconds
    });

    test.afterAll(async () => {
        await page.close();
    });
});