// Where does the hero form end on a phone's first screen?
// Usage: node scripts/first-frame.mjs [url]  -> prints the submit button's bottom edge per device.
import puppeteer from "puppeteer-core";

const url = process.argv[2] ?? "http://localhost:3100";
// Target = visible height once the browser's own bars are taken off.
const DEVICES = [
  { name: "iPhone 390x844", width: 390, height: 844, target: 650 },
  { name: "Android 360x740", width: 360, height: 740, target: 630 },
  { name: "iPhone SE 375x667", width: 375, height: 667, target: 560 },
];

const browser = await puppeteer.launch({
  executablePath: "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome",
  headless: true,
});
for (const d of DEVICES) {
  const page = await browser.newPage();
  await page.setViewport({ width: d.width, height: d.height, isMobile: true, hasTouch: true, deviceScaleFactor: 2 });
  await page.goto(url, { waitUntil: "networkidle0" });
  const r = await page.evaluate(() => {
    const card = document.querySelector("#lap-la-so");
    const btn = card?.querySelector("button[type=submit]");
    return { cardTop: Math.round(card.getBoundingClientRect().top), buttonBottom: Math.round(btn.getBoundingClientRect().bottom), cardBottom: Math.round(card.getBoundingClientRect().bottom) };
  });
  const ok = r.buttonBottom <= d.target;
  console.log(`${d.name.padEnd(18)} card top ${r.cardTop}  button bottom ${r.buttonBottom}  card bottom ${r.cardBottom}  target ≤ ${d.target}  ${ok ? "OK" : "TOO LOW"}`);
  await page.screenshot({ path: `/tmp/anvicac-ff-${d.width}.png` });
  await page.close();
}
await browser.close();
