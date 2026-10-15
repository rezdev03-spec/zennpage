import { chromium } from "playwright-core";
import { mkdirSync } from "node:fs";
import { spawn } from "node:child_process";

const PORT = 4173;
const URL = `http://localhost:${PORT}/`;

mkdirSync("shots", { recursive: true });

// Serve the production build
const server = spawn("npx", ["vite", "preview", "--port", String(PORT), "--strictPort"], {
  stdio: "ignore",
});
await new Promise((r) => setTimeout(r, 2500));

const viewports = [
  { name: "mobile-360x800", width: 360, height: 800 },
  { name: "mobile-375x812", width: 375, height: 812 },
  { name: "mobile-390x844", width: 390, height: 844 },
  { name: "mobile-430x932", width: 430, height: 932 },
  { name: "tablet-768x1024", width: 768, height: 1024 },
  { name: "desktop-1440x900", width: 1440, height: 900 },
];

const browser = await chromium.launch();
let failures = 0;

try {
  for (const vp of viewports) {
    const page = await browser.newPage({ viewport: { width: vp.width, height: vp.height } });
    const errors = [];
    page.on("pageerror", (e) => errors.push(String(e)));
    page.on("console", (m) => m.type() === "error" && errors.push(m.text()));

    await page.goto(URL, { waitUntil: "networkidle" });
    await page.evaluate(() => document.fonts.ready);
    await page.waitForTimeout(900); // entrance animations settle

    const report = await page.evaluate(() => {
      const doc = document.documentElement;
      const overflowX = Math.max(doc.scrollWidth, document.body.scrollWidth) > doc.clientWidth;
      const links = Array.from(document.querySelectorAll("a[href]")).map((a) => ({
        href: a.getAttribute("href"),
        target: a.getAttribute("target"),
        rel: a.getAttribute("rel"),
        h: Math.round(a.getBoundingClientRect().height),
      }));
      const smallTargets = Array.from(document.querySelectorAll("a[href], button"))
        .map((el) => el.getBoundingClientRect())
        .filter((r) => (r.width > 0 && r.width < 40) || (r.height > 0 && r.height < 40));
      const svgs = document.querySelectorAll("svg").length;
      return { overflowX, links, smallTargetCount: smallTargets.length, svgs };
    });

    await page.screenshot({ path: `shots/${vp.name}.png`, fullPage: true });

    const status = [
      `${vp.name}:`,
      `overflowX=${report.overflowX}`,
      `links=${report.links.length}`,
      `smallTargets<40px=${report.smallTargetCount}`,
      `svgs=${report.svgs}`,
      errors.length ? `JS_ERRORS=${errors.join(" | ")}` : "no-js-errors",
    ].join(" ");
    console.log(status);
    if (report.overflowX || report.smallTargetCount > 0 || errors.length) failures++;
    await page.close();
  }

  // Hover-state capture on desktop for interaction verification
  const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
  await page.goto(URL, { waitUntil: "networkidle" });
  await page.evaluate(() => document.fonts.ready);
  await page.waitForTimeout(900);
  const social = page.locator('a[href="https://www.tiktok.com/@zennlonevyn"]');
  await social.hover();
  await page.waitForTimeout(250);
  await page.screenshot({ path: "shots/hover-social.png" });
  // All link destinations
  const hrefs = await page.evaluate(() =>
    Array.from(document.querySelectorAll("a[href]")).map((a) => a.getAttribute("href"))
  );
  console.log("DESTINATIONS:", JSON.stringify(hrefs, null, 2));
  await page.close();
} finally {
  await browser.close();
  server.kill();
}

console.log(failures === 0 ? "ALL CHECKS PASSED" : `${failures} VIEWPORT(S) WITH FLAGS`);
process.exit(failures === 0 ? 0 : 1);
