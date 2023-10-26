import { test, expect } from "@playwright/test";

test.describe("沿革画面", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto(
      "http://localhost:3000/revision/426M60400000011?lawRevisionId=426M60400000011_20210701_503M60400000007"
    );
  });

  test("沿革画面を表示", async ({ page }) => {
    await expect(page).toHaveTitle(/沿革画面/);

    await expect(await page.getByTestId("law-title")).toHaveText(
      "国家公安委員会における特定秘密の保護に関する規則"
    );
    await expect(await page.getByTestId("law-num")).toHaveText(
      "（平成二十六年国家公安委員会規則第十一号）"
    );
  });

  // 沿革画面から他の条文画面へ遷移すること
  test("沿革画面から他の条文画面へ遷移すること", async ({ page }) => {
    const linkByRole = page.getByRole("link", {
      name: "国家公安委員会行政文書管理規則及び国家公安委員会における特定秘密の保護に関する規則の一部を改正する規則による改正 (令和元年国家公安委員会規則第九号) 施行日:令和元年12月11日 公布日：",
    });
    const href = await linkByRole.getAttribute("href");
    const text = await linkByRole.allTextContents();

    await linkByRole.click();

    const regex = /施行日:(.*?)\s*公布日/;
    const match = text.join("").match(regex) ?? [];

    await page.waitForURL(/\/law\?/);
    await expect(page).toHaveTitle(/法令画面/);
    const currentUrl = await page.url();

    // 指定のURLに遷移していること
    await expect(currentUrl).toContain(href);

    // 指定の施行日が表示されていること
    await page.waitForSelector('[data-testid="law-title-and-law-num"]');
    const enforcementDate = await page
      .getByTestId("amendment-enforcement-date")
      .allTextContents();

    if (enforcementDate.length > 0) {
      expect(enforcementDate[0]).toContain(match[1]);
    } else {
      throw new Error("enforcementDate is empty");
    }
  });
});
