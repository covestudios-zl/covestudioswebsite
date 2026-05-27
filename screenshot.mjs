import puppeteer from "puppeteer";
import fs from "fs";

const url = process.argv[2];
const label = process.argv[3] || "";

if (!fs.existsSync("temporary-screenshots")) {
  fs.mkdirSync("temporary-screenshots");
}

const browser = await puppeteer.launch();
const page = await browser.newPage();

await page.setViewport({ width: 1280, height: 800 });
await page.goto(url, { waitUntil: "networkidle2" });

const files = fs.readdirSync("temporary-screenshots");
const count = files.length + 1;

const filename = label
  ? `screenshot-${count}-${label}.png`
  : `screenshot-${count}.png`;

await page.screenshot({
  path: `temporary-screenshots/${filename}`,
  fullPage: true,
});

await browser.close();

console.log("Saved:", filename);
