// Frames of the sample chart: entrance, settled, zoomed on Mệnh, glide to another palace, zoomed out.
// Usage: node scripts/chart-check.mjs [url] [width]
import puppeteer from "puppeteer-core";

const url = process.argv[2] ?? "http://localhost:3100";
const width = Number(process.argv[3] ?? 390);
const out = "/tmp/anvicac-chart";
const browser = await puppeteer.launch({
  executablePath: "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome",
  headless: true,
});
const page = await browser.newPage();
await page.setViewport({ width, height: 844, isMobile: width < 768, hasTouch: width < 768, deviceScaleFactor: 1 });
await page.goto(url, { waitUntil: "networkidle0" });
await page.evaluate(() => {
  document.documentElement.style.scrollBehavior = "auto";
  const fig = document.querySelector("#ban-mau figure");
  window.scrollTo(0, fig.getBoundingClientRect().top + scrollY - 70);
});
const shot = async (name, wait) => {
  await new Promise((r) => setTimeout(r, wait));
  const fig = await page.$("#ban-mau figure");
  await fig.screenshot({ path: `${out}-${width}-${name}.png` });
};
await shot("1-entering", 350);
await shot("2-settled", 1900);
const state = async () =>
  page.$eval("#ban-mau figure", (f) => ({
    transform: f.querySelector(".grid").style.transform,
    pressed: [...f.querySelectorAll("button[aria-pressed=true]")].map((b) => b.getAttribute("aria-label").split(":")[0]),
    caption: f.querySelector("figcaption").textContent.trim(),
  }));
const clickPalace = (name) =>
  page.$$eval("#ban-mau figure button[aria-pressed]", (bs, n) => bs.find((b) => b.getAttribute("aria-label").startsWith(`Cung ${n} `)).click(), name);
await clickPalace("Mệnh");
await shot("3-zoom-menh", 800);
console.log("zoom Mệnh:", await state());
await clickPalace("Quan Lộc");
await shot("4-glide-quanloc", 800);
console.log("glide Quan Lộc:", await state());
await page.keyboard.press("Escape");
await shot("5-zoomed-out", 800);
console.log("after Esc:", await state());
await browser.close();
