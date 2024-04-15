import { prefectureList } from "./scraping/config";
import { scrapingNewHome } from "./scraping/sites/Scraping";

/** xpath：ページネーションリンク */
const paginationLinkXpath =
  'xpath=//div[@id="resultAjaxAllArea"]//a[text()=">"]';

/** xpath：詳細ページリンク */
const detailPageXpath = 'xpath=//div[@id="resultAjaxAllArea"]//h2[1]/a';

/** 出力ファイル名 */
const outfile = "output/land.txt";

/**
 * 土地のスクレイピング
 */
(async () => {
  console.log("土地のスクレイピング, 開始");
  for (const prefecture of prefectureList) {
    console.log(`都道府県: ${prefecture}`);
    await scrapingNewHome(
      `https://myhome.nifty.com/chuko-ikkodate/${prefecture}/search/`,
      paginationLinkXpath,
      detailPageXpath,
      outfile,
    );
  }
  console.log("土地のスクレイピング, 終了");
})();
