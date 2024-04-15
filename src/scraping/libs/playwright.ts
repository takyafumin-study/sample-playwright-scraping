import { Browser, BrowserContext, Page, chromium } from "playwright-chromium";

/**
 * ブラウザを生成する
 */
export const createBrowser = async function (): Promise<Browser> {
  return await chromium.launch({
    args: [`--lang=ja,en-US,en`],
    channel: "chrome",
    headless: true,
  });
};

/**
 * 新しいページを生成する
 *
 * @param context ブラウザコンテキスト
 */
export const createNewPage = async function (
  context: BrowserContext,
): Promise<Page> {
  const page = await context.newPage();
  page.setDefaultTimeout(0);
  page.setDefaultNavigationTimeout(0);
  return page;
};
