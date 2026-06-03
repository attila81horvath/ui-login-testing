import { test, expect } from "@playwright/test";
import {
  LoginPage,
  YOUR_PASSWORD_IS_INVALID,
  YOUR_USERNAME_IS_INVALID,
} from "../../pages/login-page";
import process from "process";
import {
  LOGGED_IN_SUCCESSFULLY,
  LoggedInPage,
} from "../../pages/loggedIn-page";

test.describe("login group", () => {
  test(`login success ${process.env.STUDENT_USERNAME} / ***${process.env.STUDENT_PASSWORD?.slice(-3)}`, async ({
    page,
  }) => {
    // given
    const loginPage = new LoginPage(page);
    const loggedInPage = new LoggedInPage(page);
    await page.goto(process.env.BASE_URL as string);

    // when
    await loginPage.login(
      process.env.STUDENT_USERNAME,
      process.env.STUDENT_PASSWORD,
    );
    await loggedInPage.waitTillLoginIsDone();

    // then
    expect(
      await loggedInPage.getPostTitle(),
      `Login is failed: ${process.env.STUDENT_USERNAME} / ***${process.env.STUDENT_PASSWORD.slice(-3)}`,
    ).toBe(LOGGED_IN_SUCCESSFULLY);
  });

  [
    { userName: undefined, password: undefined },
    { userName: "Alice", password: undefined },
    { userName: undefined, password: "Password" },
    { userName: undefined, password: process.env.STUDENT_PASSWORD },
    { userName: "James", password: process.env.STUDENT_PASSWORD },
  ].forEach(({ userName, password }) => {
    test(`login is failed when username is invalid: ${userName} / ${password}`, async ({
      page,
    }) => {
      // given
      const loginPage = new LoginPage(page);
      await page.goto(process.env.BASE_URL as string);

      // when
      await loginPage.login(userName, password);

      // then
      expect(
        await loginPage.getFailedLoginMessage(),
        "Expected error not received during negative login action!",
      ).toBe(YOUR_USERNAME_IS_INVALID);
    });
  });

  [
    { userName: process.env.STUDENT_USERNAME, password: undefined },
    { userName: process.env.STUDENT_USERNAME, password: "Jelszo" },
  ].forEach(({ userName, password }) => {
    test(`login is failed when password is invalid: ${userName} / ${password}`, async ({
      page,
    }) => {
      // given
      const loginPage = new LoginPage(page);
      await page.goto(process.env.BASE_URL as string);

      // when
      await loginPage.login(userName, password);

      // then
      expect(
        await loginPage.getFailedLoginMessage(),
        "Expected error not received during negative login action!",
      ).toBe(YOUR_PASSWORD_IS_INVALID);
    });
  });
});
