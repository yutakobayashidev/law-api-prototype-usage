import { test, expect } from "@playwright/test";

test.describe("詳細検索画面", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("http://localhost:3000/law-list");
  });

  test("詳細検索画面を表示", async ({ page }) => {
    await expect(page).toHaveTitle(/詳細検索/);
  });

  test("詳細検索画面からキーワード検索画面に遷移すること", async ({
    page,
  }) => {
    await page.getByLabel("キーワード検索").click();
    await expect(page).toHaveTitle(/キーワード検索/);
  });

  test("法令名を入力して検索し、検索結果が表示されること", async ({ page }) => {
    await page.getByPlaceholder("検索したい法令名を入力").click();
    await page
      .getByPlaceholder("検索したい法令名を入力")
      .fill(
        "電子署名等に係る地方公共団体情報システム機構の認証業務に関する法律施行規則"
      );
    await page.getByLabel("法令を検索").click();
    await page.waitForSelector("#searchResult");
    const searchResult = await page.locator("#searchResult");
    await expect(searchResult).toBeVisible();
    await expect(page.getByLabel("検索条件をすべて表示")).toBeVisible();
  });
});

test.describe("詳細検索画面_検索後", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/law-list");
    await page.getByLabel("法令を検索").click();
    await page.locator("#searchResult");
    await expect(page.getByLabel("検索条件をすべて表示")).toBeVisible();
  });

  test("検索条件の表示/非表示切り替え", async ({ page }) => {
    await page.getByLabel("検索条件をすべて表示").click();
    await expect(page.getByLabel("検索条件を閉じる")).toBeVisible();
    await expect(page.getByLabel("検索条件をすべて表示")).not.toBeVisible();
    // 検索条件の表示状態から非表示状態に変更
    await page.getByLabel("検索条件を閉じる").click();
    await expect(page.getByLabel("検索条件をすべて表示")).toBeVisible();
    await expect(page.getByLabel("検索条件を閉じる")).not.toBeVisible();
  });

  test("ページネーションの動作確認_最初->次->前", async ({ page }) => {
    // 次ページへ遷移
    const pageCount = await page
      .getByTestId("current-and-total-pages")
      .allTextContents();
    const currentPage = pageCount[0].split("/")[0];
    const nextPage = page.getByLabel("Next");
    const href = (await nextPage.getAttribute("href")) ?? "";
    await nextPage.click();
    await page.waitForURL(href);
    await page.waitForSelector("[data-testid='current-and-total-pages']");
    const newPageCount = await page
      .getByTestId("current-and-total-pages")
      .allTextContents();
    const newCurrentPage = newPageCount[0].split("/")[0];
    expect(currentPage).not.toEqual(newCurrentPage);

    // 前のぺージへ遷移
    const prevPage = page.getByLabel("Prev");
    const prevPageHref = (await prevPage.getAttribute("href")) ?? "";
    await prevPage.click();
    await page.waitForURL(prevPageHref);
    await page.waitForSelector("[data-testid='current-and-total-pages']");
    const newPageCount2 = await page
      .getByTestId("current-and-total-pages")
      .allTextContents();
    const newCurrentPage2 = newPageCount2[0].split("/")[0];
    expect(newCurrentPage2).toEqual(currentPage);
  });

  test("ページネーションの動作確認_最初->最後->最初", async ({ page }) => {
    // 最初のページから最後のページへ遷移
    const pageCount = await page
      .getByTestId("current-and-total-pages")
      .allTextContents();
    const lastPage = pageCount[0].split("/")[1];
    const nextPage = page.getByLabel("Last");
    const href = (await nextPage.getAttribute("href")) ?? "";
    await nextPage.click();
    await page.waitForURL(href);
    await page.waitForSelector("[data-testid='current-and-total-pages']");
    const newPageCount = await page
      .getByTestId("current-and-total-pages")
      .allTextContents();
    const currentLastPage = newPageCount[0].split("/")[0];
    expect(lastPage).toEqual(currentLastPage);

    // 最後のページから最初のページへ遷移
    const firstPage = page.getByLabel("First");
    const firstPageHref = (await firstPage.getAttribute("href")) ?? "";
    await firstPage.click();
    await page.waitForURL(firstPageHref);
    await page.waitForSelector("[data-testid='current-and-total-pages']");
    const newPageCount2 = await page
      .getByTestId("current-and-total-pages")
      .allTextContents();
    const currentFirstPage = newPageCount2[0].split("/")[0];
    expect(currentFirstPage).toEqual("1");
  });
});
