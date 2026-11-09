// Viewport (not full-page) screenshots at given scroll targets, to check fixed UI like the mobile CTA bar.
// Usage: node scripts/viewport-shots.mjs <url> <outDir> <width> <selector|y> [...]
import puppeteer from "puppeteer-core";
import { mkdirSync } from "node:fs";

const [url, outDir, width = "390", ...targets] = process.argv.slice(2);
mkdirSync(outDir, { recursive: true });
const browser = await puppeteer.launch({
  executablePath: "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome",
  headless: true,
});
const page = await browser.newPage();
const w = Number(width);
await page.setViewport({ width: w, height: 844, isMobile: w < 768, hasTouch: w < 768 });
await page.goto(url, { waitUntil: "networkidle0" });
await page.evaluate(() => (document.documentElement.style.scrollBehavior = "auto"));
for (const [i, t] of targets.entries()) {
  await page.evaluate((target) => {
    const y = /^\d+$/.test(target) ? Number(target) : document.querySelector(target).getBoundingClientRect().top + scrollY - 70;
    window.scrollTo(0, y);
  }, t);
  await new Promise((r) => setTimeout(r, 700));
  const bar = await page.evaluate(() => {
    const el = document.querySelector('[aria-hidden][class*="bottom-0"]');
    return el ? el.getAttribute("aria-hidden") : "none";
  });
  const file = `${outDir}/v${w}-${i}.png`;
  await page.screenshot({ path: file });
  console.log(file, t, "bar hidden:", bar);
}
await browser.close();
