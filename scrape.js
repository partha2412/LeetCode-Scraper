import puppeteer from "puppeteer";

export async function extract(url) {
  const browser = await puppeteer.launch({
    headless: true,
    args: ["--no-sandbox", "--disable-setuid-sandbox"],
  });

  try {
    const page = await browser.newPage();

    await page.setViewport({
      width: 1366,
      height: 768,
    });

    await page.setUserAgent(
      "Mozilla/5.0 (Windows NT 10.0; Win64; x64) " +
        "AppleWebKit/537.36 (KHTML, like Gecko) " +
        "Chrome/154.0.0.0 Safari/537.36",
    );

    await page.goto(url, {
      waitUntil: "networkidle2",
      timeout: 60000,
    });

    const res = [];

    // Submit Count
    const submitCount = await page.$eval("span.font-semibold", (el) =>
      el.textContent.trim(),
    );

    res.push(submitCount);

    // Recent submissions
    const texts = await page.$$eval(
      "div.flex.flex-1.justify-between",
      (elements) =>
        elements.slice(0, 5).map((el) => {
          const spans = el.querySelectorAll("span");
          const link = el.closest("a");

          return {
            text: spans[0]?.innerText.trim(),
            time: spans[1]?.innerText.trim(),
            href: link?.href,
          };
        }),
    );

    res.push(texts);

    return res;
  } finally {
    await browser.close();
  }
}
