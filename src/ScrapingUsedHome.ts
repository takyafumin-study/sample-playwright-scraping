import { prefectureList } from "./scraping/config";
import { createBrowser } from "./scraping/libs/playwright";
import { scraping } from "./scraping/sites/Scraping";

/** xpath：ページネーションリンク */
const paginationLinkXpath =
  'xpath=//div[@id="resultAjaxAllArea"]//a[text()=">"]';

/** xpath：詳細ページリンク */
const detailPageXpath = 'xpath=//div[@id="resultAjaxAllArea"]//h2[1]/a';

/** 出力ファイル名 */
const outfile = "output/used_home.txt";

/**
 * 中古戸建てのスクレイピング
 */
(async () => {
  console.log("中古戸建てのスクレイピング, 開始");

  const browser = await createBrowser();
  const context = await browser.newContext();

  for (const prefecture of prefectureList) {
    console.log(`都道府県: ${prefecture}`);
    await scraping(
      `https://myhome.nifty.com/chuko-ikkodate/${prefecture}/search/`,
      paginationLinkXpath,
      detailPageXpath,
      outfile,
      context,
    );
  }

  await context.close();
  await browser.close();
  console.log("中古戸建てのスクレイピング, 終了");
})();
