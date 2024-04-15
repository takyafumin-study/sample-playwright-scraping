import { chromium } from "playwright-chromium";
import { scrapingNewHome } from "./scraping/sites/NewHome";
import { scrapingUsedHome } from "./scraping/sites/UsedHome";

const run = async () => {
  // --------------------
  // setup browser
  // --------------------
  const browser = await chromium.launch({
    args: [`--lang=ja,en-US,en`],
    headless: true,
  });

  // --------------------
  // スクレイピング
  // --------------------

  // 新築戸建て
  await scrapingNewHome(browser);

  // 中古戸建て
  await scrapingUsedHome(browser);

  // --------------------
  // close browser
  // --------------------
  await browser.close();
};


// run batch scraping
run();
