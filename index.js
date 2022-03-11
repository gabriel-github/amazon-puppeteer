const puppeteer = require("puppeteer");
const fs = require("fs");

(async () => {
  const browser = await puppeteer.launch({
    headless: false,
    defaultViewport: false,
    userDataDir: "./tmp",
  });
  const page = await browser.newPage();
  await page.goto("https://www.amazon.com.br/");

  await page.waitForSelector("#nav-link-accountList");
  await page.waitForTimeout(3000);

  await page.click("#nav-link-accountList");

  await page.waitForTimeout(3000);

  await page.waitForSelector('input[name="email"]');
  await page.type('input[name="email"]', "email@email.com");

  await page.waitForTimeout(3000);

  await page.waitForSelector("#continue");
  await page.click("#continue");

  await page.waitForTimeout(3000);

  await page.waitForSelector('input[name="password"]');
  await page.type('input[name="password"]', "sua-senha");

  await page.waitForTimeout(3000);

  await page.waitForSelector("#signInSubmit");
  await page.click("#signInSubmit");

  await page.waitForTimeout(3000);

  await page.waitForSelector('[name="field-keywords"]');
  await page.type('[name="field-keywords"]', "harry potter");

  await page.waitForTimeout(3000);

  await page.waitForSelector("#nav-search-submit-text");
  await page.click("#nav-search-submit-text");

  await page.waitForTimeout(3000);

  const imgProducts = await page.evaluate(() => {
    const items = document.querySelectorAll("img.s-image");

    const imgItems = [...items];

    const imgProducts = imgItems.map(({ src }) => ({ src }));

    return imgProducts;
  });

  fs.writeFile(
    "amazonproducts.json",
    JSON.stringify(imgProducts, null, 2),
    function (err) {
      if (err) return console.log(err);
      console.log("will done!");
    }
  );

  await browser.close();
})();
