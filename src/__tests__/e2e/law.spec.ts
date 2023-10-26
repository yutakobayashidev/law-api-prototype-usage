import { test, expect } from "@playwright/test";

test.describe("法令画面", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("http://localhost:3000/law?lawId=426M60400000011");
  });

  test("法令画面を表示", async ({ page }) => {
    await expect(page).toHaveTitle(/法令画面/);

    await expect(await page.getByTestId("law-title-and-law-num")).toHaveText(
      "国家公安委員会における特定秘密の保護に関する規則(平成二十六年国家公安委員会規則第十一号)"
    );
  });

  test("法令画面から文書画面へ遷移すること", async ({ page, isMobile }) => {
    if (isMobile) {
      await page.getByTestId("revision-link-mobile").click();
    } else {
      await page.getByTestId("revision-link-pc").click();
    }
    await page.waitForURL(/\/revision\/.+/);
    await expect(page).toHaveTitle(/沿革画面/);
  });
});

