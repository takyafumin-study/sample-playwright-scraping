import { Browser } from "playwright-chromium";

/**
 * 中古戸建てのスクレイピング
 *
 * @param browser Playwright Browser
 */
export async function scrapingUsedHome(browser: Browser) {
    const page = await browser.newPage();
    await page.goto("https://myhome.nifty.com/shinchiku-ikkodate/tokyo/search/");
    await page.screenshot({ path: `UsedHome.png` });
    await page.close();
}
