import { test, expect } from '@playwright/test';
import { INVALID_CREDENTIALS, LoginPage } from '../pages/login-page';
import { DashboardPage } from '../pages/dashboard-page';
import process from 'process';

test.describe('login group', () => {
  test(`login success ${process.env.ADMIN_USERNAME} / ***${process.env.ADMIN_PASSWORD?.slice(-3)}`, async ({ page }) => {
    // given
    await page.goto(process.env.BASE_URL as string);

    // when
    const loginPage = new LoginPage(page);
    await loginPage.login(process.env.ADMIN_USERNAME, process.env.ADMIN_PASSWORD);
    const dashboardPage = new DashboardPage(page);
    await dashboardPage.waitTillDashboardIsLoaded();

    // then    
    expect(await dashboardPage.getFullUsername(), 'Full name of admin is not available via Dashboard!').not.toBeNull();
  });
[
  { userName: null, password: null },
  { userName: 'Alice', password: null },
  { userName: null, password: 'Password' },
  { userName: process.env.ADMIN_USERNAME, password: null},
  { userName: null, password: process.env.ADMIN_PASSWORD },
].forEach(({ userName, password }) => {
    test(`login is failed because of required field ${userName} / ${password}`, async ({ page }) => {
      // given
      await page.goto(process.env.BASE_URL as string);

      // when
      const loginPage = new LoginPage(page);
      await loginPage.login(userName, password);

      // then
      expect(await loginPage.getCountOfRequred(), 'Required is not available during login action!').toBeGreaterThanOrEqual(1);
    });
  });

  [
  { userName: process.env.ADMIN_USERNAME, password: 'Jelszo' },
  { userName: 'James', password: process.env.ADMIN_PASSWORD },
].forEach(({ userName, password }) => {
    test(`login is failed when ${userName} / ***${password?.slice(-3)}`, async ({ page }) => {
      // given
      await page.goto(process.env.BASE_URL as string);

      // when
      const loginPage = new LoginPage(page);
      await loginPage.login(userName, password);

      // then
      expect(await loginPage.getFailedLoginMessage(), 'Failed login message is not available during login action!').toBe(INVALID_CREDENTIALS);
    });
  });

  test.afterEach(async ({ page }) => {
    await page.close();
  });
});
