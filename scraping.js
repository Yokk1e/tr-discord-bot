const puppeteer = require("puppeteer");

const url = "https://talesrunner.playpark.com/th-th/category/news/";

async function getNews() {
  const browser = await puppeteer.launch({ headless: true });
  const page = await browser.newPage();
  await page.goto(url);

  const getAllTagA = await page.$$("a.td-image-wrap");

  const hrefs = await Promise.all(
    getAllTagA.map((handle) => handle.getProperty("href"))
  );
  const links = await Promise.all(hrefs.map((handle) => handle.jsonValue()));

  return links;
}

module.exports = { getNews };
