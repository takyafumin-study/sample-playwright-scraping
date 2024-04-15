import { chromium } from "playwright-chromium";

(async () => {
  // --------------------
  // setup browser
  // --------------------
  const browser = await chromium.launch({
    headless: true,
  });

  // --------------------
  // create a new page
  // --------------------
  const page = await browser.newPage();
  await page.goto("https://yahoo.co.jp");
  await page.screenshot({ path: `tmp/sample.png` });

  // --------------------
  // close page, browser
  // --------------------
  await page.close();
  await browser.close();
})();
