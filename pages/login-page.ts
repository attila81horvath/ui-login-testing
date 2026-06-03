import { expect, Locator, Page } from "@playwright/test";

export const YOUR_USERNAME_IS_INVALID = 'Your username is invalid!';
export const YOUR_PASSWORD_IS_INVALID = 'Your password is invalid!';

export class LoginPage {
  private readonly form: Locator;
  private readonly usernameInput: Locator;
  private readonly passwordInput: Locator;
  private readonly loginButton: Locator;
  private readonly alert: Locator;

  constructor(private readonly page: Page) {
    this.form = this.page.locator('div[id="form"]');
    this.usernameInput = this.form.locator('input[name="username"]');
    this.passwordInput = this.form.locator('input[name="password"]');
    this.loginButton = this.form.locator("button").getByText("Submit");
    this.alert = this.page.locator('div[id="error"]');
  }

  async login(userName?: string, password?: string): Promise<void> {
    await this.usernameInput.fill(userName ?? "");
    await this.passwordInput.fill(password ?? "");
    await this.loginButton.click();
  }

  async getFailedLoginMessage(): Promise<string | null> {
    await this.alert.waitFor({ state: "visible" });
    return await this.alert.textContent();
  }
}
