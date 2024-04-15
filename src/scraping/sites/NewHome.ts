import { Browser } from "playwright-chromium";

/**
 * 新築戸建てのスクレイピング
 *
 * @param browser Playwright Browser
 */
export async function scrapingNewHome(browser: Browser) {
    const page = await browser.newPage();
    await page.goto("https://myhome.nifty.com/chuko-ikkodate/tokyo/search/");
    await page.screenshot({ path: `NewHome.png` });
    await page.close();
}
