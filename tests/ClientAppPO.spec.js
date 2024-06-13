const { default: test } = require("node:test");


const dataset = JSON.parse(JSON.stringify(require("../utils/sessionCrTestData.json")));


for (const data of dataset) {

    test(`start session with a client ${data.productName}`, async ({ page }) => {
        const poManager = new poManager

    })





}




