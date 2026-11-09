// Compare section heights between two URLs: node scripts/measure.mjs <urlA> <urlB> [width]
import puppeteer from "puppeteer-core";
const [a, b, w = "1440"] = process.argv.slice(2);
const browser = await puppeteer.launch({ executablePath: "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome", headless: true });
const measure = async (url) => {
  const page = await browser.newPage();
  const width = Number(w);
  await page.setViewport({ width, height: 900, isMobile: width < 768, hasTouch: width < 768 });
  await page.goto(url, { waitUntil: "networkidle0" });
  const r = await page.evaluate(() =>
    [...document.querySelectorAll("header, main > section, main > div, footer")].map((el) => {
      const h = el.querySelector("h1,h2,h3,p");
      return { tag: el.tagName, label: (h?.textContent || "").trim().slice(0, 28), h: Math.round(el.getBoundingClientRect().height) };
    }),
  );
  await page.close();
  return r;
};
const [ra, rb] = [await measure(a), await measure(b)];
for (let i = 0; i < Math.max(ra.length, rb.length); i++) {
  const x = ra[i] || {}, y = rb[i] || {};
  console.log(String(i).padStart(2), (x.label || "").padEnd(30), String(x.h).padStart(5), String(y.h).padStart(5), x.h !== y.h ? `Δ ${y.h - x.h}` : "");
}
await browser.close();
