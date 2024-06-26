import { BrowserContext } from "playwright-chromium";
import { extractBaseUrl, getPropertyLinks } from "../libs/ScrapingUtils";
import { createBrowser, createNewPage } from "../libs/playwright";

/**
 * スクレイピング
 *
 * @param url スクレイピング対象のURL
 * @param paginationLinkXpath ページネーションリンクのXPath
 * @param detailPageXpath 詳細ページリンクのXPath
 * @param outfile 出力ファイル名
 */
export async function scraping(
  url: string,
  paginationLinkXpath: string,
  detailPageXpath: string,
  outfile: string,
  context: BrowserContext,
): Promise<void> {
  // open
  // let browser = await createBrowser();
  // let context = await browser.newContext();

  let nextUrl = url;
  let pageCounter = 0;
  let counter = 0;

  while (true) {
    // if (pageCounter > 1 && pageCounter % 100 === 0) {
    // 100ページごとにブラウザオブジェクト等を再生成
    // console.log(`ページ数: ${pageCounter + 1}, ブラウザオブジェクト再生成`);
    // await context.close();
    // await browser.close();

    // browser = await createBrowser();
    // context = await browser.newContext();
    // }

    // ページを開く
    const page = await createNewPage(context);
    await page.goto(nextUrl);
    const baseUrl = extractBaseUrl(nextUrl);

    // 物件リンク取得
    const links = await getPropertyLinks(page, detailPageXpath);
    links.forEach((link) => {
      const fs = require("fs");
      fs.appendFileSync(
        outfile,
        !link.startsWith("https") ? baseUrl + link + "\n" : link + "\n",
      );
    });
    counter += links.length;
    console.log(`ページ数: ${pageCounter + 1}, 件数: ${counter}`);

    // ページリンク取得
    const pageLinkCount = await page.locator(paginationLinkXpath).count();
    if (pageLinkCount === 0) {
      // 次のページがない場合は終了
      break;
    }

    // ページリンクから次のページのURLを生成
    const pagingLink = page.locator(paginationLinkXpath).first();
    nextUrl = baseUrl + (await pagingLink.getAttribute("href"));

    await page.close();
    pageCounter++;
  }

  // close
  // await context.close();
  // await browser.close();
}
