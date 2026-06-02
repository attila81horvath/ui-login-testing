import { Locator, Page } from "@playwright/test";

export class DashboardPage {
    private readonly userDropDown: Locator;
    private userAccountFullName: Locator;

    constructor(protected readonly page: Page) {
        this.userDropDown = this.page.locator('span[class="oxd-userdropdown-tab"]');
        this.userAccountFullName = this.userDropDown.locator('p[class="oxd-userdropdown-name"]');
    };

    async getFullUsername(): Promise<string | null> {
        return await this.userAccountFullName.textContent();
    }

    async waitTillDashboardIsLoaded(): Promise<void> {
        await this.page.waitForURL('**/web/index.php/dashboard/index', { waitUntil: "load" });
    }
}