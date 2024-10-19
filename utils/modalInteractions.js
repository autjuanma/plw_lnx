const SELECTORS = {
    DOCUMENT_LINK: "[href*='documents-request']",
    NEW_PAGE_TEXT: ".ble #red",
    USERNAME_INPUT: '#userxpnls'
};

class ModalInteractions {
    constructor(page, context) {
        this.page = page;
        this.context = context;
    }

    async openDocumentLink() {
        const documentLink = this.page.locator(SELECTORS.DOCUMENT_LINK);
        await documentLink.click();
    }

    async getTextFromNewPage() {
        const [newPage] = await Promise.all([
            this.context.waitForEvent('page'),
            this.openDocumentLink(),
        ]);

        await newPage.waitForLoadState('domcontentloaded'); // Ensure the new page has loaded
        const text = await newPage.locator(SELECTORS.NEW_PAGE_TEXT).textContent();
        return text;
    }

    async getDomainFromNewPage() {
        const text = await this.getTextFromNewPage();
        const arrayText = text.split("@");
        const domain = arrayText[1].split(" ")[0];
        return domain;
    }

    async getUsernameInputValue() {
        const usernameInput = this.page.locator(SELECTORS.USERNAME_INPUT);
        return await usernameInput.textContent();
    }
}

module.exports = ModalInteractions;