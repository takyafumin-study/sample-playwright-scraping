import { Page } from "playwright-chromium";

/**
 * 詳細ページリンクを取得する
 *
 * @param page ページ
 * @param xpath 詳細ページリンクのXPath
 */
export async function getPropertyLinks(
  page: Page,
  xpath: string,
): Promise<string[]> {
  await page.waitForSelector(xpath);
  const links = await page.$$eval(xpath, (elements) =>
    elements.map((el) => el.getAttribute("href")),
  );
  return links.filter((link) => link !== null) as string[];
}

/**
 * 正規表現を使用してURLからスキーマ＋ドメイン`https://example.com`を抽出する
 *
 * @param url ページURL
 */
export const extractBaseUrl = function (url: string): string {
  const regex = /^(https:\/\/[^\/]+)/;
  const matches = url.match(regex);

  // マッチした部分があれば、最初のマッチを返す
  if (matches && matches.length > 0) {
    return matches[0];
  }

  return "";
};
