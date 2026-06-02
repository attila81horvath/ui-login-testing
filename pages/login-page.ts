import { expect, Locator, Page } from "@playwright/test";

export const INVALID_CREDENTIALS = "Invalid credentials";

export class LoginPage {
    private readonly usernameInput: Locator;
    private readonly passwordInput: Locator;
    private readonly loginButton: Locator;
    private readonly alert: Locator;
    private readonly required: Locator;

    constructor(protected readonly page: Page) {
        this.usernameInput = this.page.locator('input[name="username"]');
        this.passwordInput = this.page.locator('input[name="password"]');
        this.loginButton = this.page.locator('button').getByText('Login');
        this.alert = this.page.locator('div[role="alert"]');
        this.required = this.page.getByText('Required');
    };

    async login(userName?: string, password?: string): Promise<void> {
        await this.usernameInput.fill(userName ?? "");
        await this.passwordInput.fill(password ?? "");
        await this.loginButton.click();        
    }

    async getFailedLoginMessage(): Promise<string | null> {
        await this.alert.waitFor({ state: "visible" });
        return await this.alert.locator('p').textContent();
    }

    async getCountOfRequred(): Promise<number> {
        await this.required.first().waitFor({ state: "visible" });
        return this.required.count();
    }
}