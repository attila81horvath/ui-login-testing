import { Locator, Page } from "@playwright/test";

export const LOGGED_IN_SUCCESSFULLY = "Logged In Successfully";

export class LoggedInPage {
  private readonly postTitle: Locator;
  private readonly logoutButton: Locator;

  constructor(private readonly page: Page) {
    this.postTitle = this.page.locator('h1[class="post-title"]');
    this.logoutButton = this.page.getByText("Log out");
  }

  async waitTillLoginIsDone(): Promise<void> {
    await this.page.waitForURL("**/logged-in-successfully/");
  }

  async getPostTitle(): Promise<string | null> {
    return await this.postTitle.textContent();
  }

  async pressLogoutButton(): Promise<void> {
    await this.logoutButton.waitFor({ state: "visible" });
    await this.logoutButton.click();
  }
}
