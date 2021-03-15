const puppeteer = require("puppeteer");

const url = "https://talesrunner.playpark.com/th-th/category/news/";

async function getNews() {
  const browser = await puppeteer.launch({ headless: true });
  const page = await browser.newPage();
  await page.goto(url);

  const bodyHTML = await page.evaluate(() =>{
    let test = document.getElementsByClassName("td-ss-main-content")
    console.log(test)
   } );
  
}

module.exports = { getNews };
