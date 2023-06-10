import puppeteer from "puppeteer";
import { fork } from "child_process";

jest.setTimeout(30000);

describe("Page start", () => {
  let browser;
  let page;
  let server = null;
  const baseUrl = "http://localhost:9000";

  beforeAll(async () => {
    server = fork(`${__dirname}/e2e.server.js`);
    await new Promise((resolve, reject) => {
      server.on("error", reject);
      server.on("message", (message) => {
        if (message === "ok") {
          resolve();
        }
      });
    });
    browser = await puppeteer.launch({
      headless: false,
      slowMo: 100,
      devtools: true,
    });

    page = await browser.newPage();
  });

  test("test to check method of show tooltip", async () => {
    await page.goto(baseUrl);

    const body = await page.waitForSelector("body");

    const form = await body.$(".form");
    const btn = await form.$(".btn");

    await btn.click();

    const tooltip = await body.$(".tooltip");
    const result = {
      tooltip: await tooltip.classList,
      title: await tooltip.$(".tooltip-title").textContent,
      content: await tooltip.$(".tooltip-text").textContent,
    };

    expect(result).toEquel({
      tooltip: "tooltip",
      title: "Popover title",
      content: "And here's some amazing content. It's very engaging. Right?",
    });
  });

  test("test to check method of remove tooltip", async () => {
    await page.goto(baseUrl);

    const body = await page.waitForSelector("body");

    const form = await body.$(".form");
    const btn = await form.$(".btn");

    await btn.click();
    await btn.click();

    const tooltip = await body.$$(".tooltip");

    expect(tooltip.length).toBe(0);
  });

  afterAll(async () => {
    await browser.close();
    server.kill();
  });
});
