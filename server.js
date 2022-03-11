const puppeteer = require("puppeteer");

const randomIntFromInterval = (min, max) => {
  return Math.floor(Math.random() * (max - min) + min);
};

async function sleepFor(page, min, max) {
  const sleepDuration = randomIntFromInterval(min, max);

  await page.waitForTimeout(sleepDuration);
}

(async () => {
  const browser = await puppeteer.launch({
    headless: false,
    defaultViewport: false,
    userDataDir: "./tmp",
  });
  const page = await browser.newPage();
  await page.goto("https://twitter.com/i/flow/login");
  await sleepFor(page, 1000, 2000);

  await page.waitForSelector('[type="text"]');
  await page.type('[type="text"]', "email@gmail.com");

  await page.waitForTimeout(3000);

  const button = await page.waitForXPath(
    '//*[@id="layers"]/div/div/div/div/div/div/div[2]/div[2]/div/div/div[2]/div[2]/div[1]/div/div/div[6]/div'
  );

  button.click();

  await page.waitForTimeout(3000);

  await page.waitForSelector('[data-testid="ocfEnterTextTextInput"]');
  await page.type(
    '[data-testid="ocfEnterTextTextInput"]',
    "numero de telefone"
  );

  await page.waitForTimeout(4000);

  const buttonSignAfterError = await page.waitForXPath(
    '//*[@id="layers"]/div/div/div/div/div/div/div[2]/div[2]/div/div/div[2]/div[2]/div[2]/div/div'
  );
  buttonSignAfterError.click();

  await page.waitForTimeout(3000);

  await page.waitForSelector('[name="password"]');
  await page.type('[name="password"]', "senha teste");

  await page.waitForTimeout(4000);
  const buttonSign = await page.waitForXPath(
    '//*[@id="layers"]/div/div/div/div/div/div/div[2]/div[2]/div/div/div[2]/div[2]/div[2]/div/div[1]/div'
  );
  buttonSign.click();
  await browser.close();
})();
