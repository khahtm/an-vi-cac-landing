// Visual QA: full-page screenshots of a URL at desktop/tablet/mobile widths.
// Usage: node scripts/shots.mjs <url> <outDir> [widths=1440,768,390]
import puppeteer from "puppeteer-core";
import { mkdirSync } from "node:fs";

const [url, outDir, widthsArg = "1440,768,390"] = process.argv.slice(2);
if (!url || !outDir) {
  console.error("Usage: node scripts/shots.mjs <url> <outDir> [widths]");
  process.exit(1);
}
mkdirSync(outDir, { recursive: true });

const browser = await puppeteer.launch({
  executablePath: "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome",
  headless: true,
});
try {
  for (const w of widthsArg.split(",").map(Number)) {
    const page = await browser.newPage();
    const mobile = w < 768;
    await page.setViewport({ width: w, height: mobile ? 844 : 900, deviceScaleFactor: 1, isMobile: mobile, hasTouch: mobile });
    await page.goto(url, { waitUntil: "networkidle0", timeout: 60000 });
    // Reveal-on-scroll content: walk the page so every observer fires.
    await page.evaluate(async () => {
      // The site scrolls smoothly; jump instantly so every section is really visited.
      document.documentElement.style.scrollBehavior = "auto";
      for (let y = 0; y < document.documentElement.scrollHeight; y += 400) {
        window.scrollTo(0, y);
        await new Promise((r) => setTimeout(r, 80));
      }
      window.scrollTo(0, 0);
      await new Promise((r) => setTimeout(r, 900));
    });
    const info = await page.evaluate(() => ({
      scrollWidth: document.documentElement.scrollWidth,
      innerWidth: window.innerWidth,
      height: document.documentElement.scrollHeight,
    }));
    const file = `${outDir}/w${w}-full.png`;
    await page.screenshot({ path: file, fullPage: true });
    console.log(file, JSON.stringify(info), info.scrollWidth > info.innerWidth ? "HORIZONTAL OVERFLOW" : "ok");
    await page.close();
  }
} finally {
  await browser.close();
}
