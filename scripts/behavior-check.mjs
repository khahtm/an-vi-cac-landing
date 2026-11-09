// Interaction smoke test. Never submits the final step, which would create a record in the real app.
// Usage: node scripts/behavior-check.mjs [url]
import puppeteer from "puppeteer-core";

const url = process.argv[2] ?? "http://localhost:3100";
const browser = await puppeteer.launch({
  executablePath: "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome",
  headless: true,
});
const page = await browser.newPage();
await page.setViewport({ width: 390, height: 844, isMobile: true, hasTouch: true });
await page.goto(url, { waitUntil: "networkidle0" });
const log = (k, v) => console.log(k.padEnd(34), v);
const wait = (ms) => new Promise((r) => setTimeout(r, ms));
const form = "#lap-la-so form";
const errors = () => page.$$eval(`${form} [id$=-error]`, (e) => e.map((x) => x.textContent).join(" / "));

await page.click('button[aria-controls="site-header-mobile-panel"]');
log("mobile menu links", await page.$$eval("#site-header-mobile-panel a", (a) => a.map((x) => x.textContent).join(" | ")));
await page.keyboard.press("Escape");
await wait(100);
log("menu closed on Esc", (await page.$("#site-header-mobile-panel")) === null);

await page.click(`${form} button[type=submit]`);
await wait(100);
log("step1 empty -> errors", await errors());

await page.type(`${form} input[id$="-name"]`, "Nguyen Van Test");
const email = await page.$(`${form} input[type=email]`);
if (email) await email.type("test@example.com");
await page.$$eval(`${form} [role=radiogroup] label`, (ls) => ls[0].click());
const selects = await page.$$(`${form} [role=group] select`);
await selects[0].select("31");
await selects[1].select("2");
await selects[2].select("1990");
await page.select(`${form} select[id$="-birthTime"]`, "Ngọ (11-13)");
await page.click(`${form} button[type=submit]`);
await wait(100);
log("31/02 -> error", await errors());
await selects[0].select("15");
await page.click(`${form} button[type=submit]`);
await wait(300);
log("step 2 heading", await page.$eval("#lap-la-so h2", (h) => h.textContent));
log("kicker", await page.$eval("#lap-la-so .type-kicker", (h) => h.textContent));
await page.type(`${form} input[id$="-phone"]`, "12345");
await page.click(`${form} button[type=submit]`);
await wait(100);
log("bad phone -> error", await errors());
log("buttons on step 2", await page.$$eval(`${form} button`, (b) => b.map((x) => x.textContent).join(" | ")));

await page.evaluate(() => window.scrollTo({ top: document.documentElement.scrollHeight * 0.5, behavior: "instant" }));
await wait(400);
log("back-to-top visible at 50%", (await page.$('button[aria-label="Về đầu trang"]')) !== null);

const before = await page.$$eval("#cau-hoi details", (d) => d.map((x) => x.open));
await page.$$eval("#cau-hoi summary", (s) => s[1].click());
const after = await page.$$eval("#cau-hoi details", (d) => d.map((x) => x.open));
log("faq open states", `${JSON.stringify(before)} -> ${JSON.stringify(after)}`);

const extra = process.argv[3];
if (extra === "--light-checks") {
  log("theme", await page.evaluate(() => getComputedStyle(document.body).backgroundColor));
}
await browser.close();
