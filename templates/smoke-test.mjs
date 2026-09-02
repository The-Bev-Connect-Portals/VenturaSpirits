// Brand-agnostic render check: drives the real assets/app.js against
// brand.config.js in jsdom. No browser, no network.
//
//   cd templates && npm i jsdom && node smoke-test.mjs
//
// Derives every assertion from the config, so it works unchanged for any
// brand. Fails loudly if app.js reaches for Shopify while demoProducts is
// populated — the fastest way to catch a botched demo-to-live flip either way.
import { JSDOM } from "jsdom";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const { BRAND } = await import(path.join(root, "brand.config.js"));
const DEMO = BRAND.demoProducts.length > 0;

const dom = new JSDOM(fs.readFileSync(path.join(root, "index.html"), "utf8"), {
  url: "https://example.netlify.app/", runScripts: "outside-only", pretendToBeVisual: true,
});
const { window } = dom;
global.window = window; global.document = window.document;
for (const k of ["localStorage","sessionStorage","location","navigator","HTMLElement","Node",
                 "DOMParser","CustomEvent","Event","getComputedStyle","matchMedia",
                 "IntersectionObserver","requestAnimationFrame"]) {
  if (window[k] !== undefined) { try { global[k] = window[k]; } catch {} }
}
global.matchMedia = window.matchMedia || (() => ({ matches:false, addEventListener(){}, removeEventListener(){} }));
global.IntersectionObserver = window.IntersectionObserver || class { observe(){} unobserve(){} disconnect(){} };
global.fetch = async () => { throw new Error("NETWORK CALL — demo mode must never hit Shopify"); };

await import(path.join(root, "assets/app.js"));
await new Promise(r => setTimeout(r, 400));

const d = window.document;
let failed = 0;
const check = (ok, label, detail = "") => {
  if (!ok) failed++;
  console.log(`  ${ok ? "ok  " : "FAIL"}  ${label}${detail ? "  — " + detail : ""}`);
};

console.log(`\n${BRAND.name} (${BRAND.slug}) — demo mode: ${DEMO}\n`);

console.log("theme");
for (const [key, cssVar] of [["accent","--accent"],["gold","--gold"],["bg","--bg"],["text","--text"]]) {
  const got = d.documentElement.style.getPropertyValue(cssVar);
  check(got.toUpperCase() === BRAND.colors[key].toUpperCase(), `${cssVar} = ${BRAND.colors[key]}`, got);
}
check(d.title.includes(BRAND.name), "document title carries brand name", d.title);

console.log("\ncatalog");
const grid = d.querySelector("#grid");
check(grid?.children.length === BRAND.demoProducts.length,
      `grid renders all ${BRAND.demoProducts.length} products`, `got ${grid?.children.length}`);
const body = () => d.body.textContent.replace(/\s+/g, " ");
for (const p of BRAND.demoProducts) {
  check(body().includes(p.price.amount), `price ${p.price.amount} present (${p.handle})`);
}

console.log("\nfilters");
for (const f of BRAND.filters) {
  if (!f.tag) continue;
  const n = BRAND.demoProducts.filter(p => (p.tags || []).includes(f.tag)).length;
  check(n > 0, `"${f.label}" matches ${n} product(s)`,
        n === 0 ? "filter would hide itself" : "");
}

console.log("\ncart gate");
const addBtn = [...d.querySelectorAll("button")].find(b => /add/i.test(b.textContent));
check(!!addBtn, "an Add button exists");
if (addBtn) {
  addBtn.click();
  await new Promise(r => setTimeout(r, 200));
  const t = body();
  const S = BRAND.adultSignature || {};
  if (S.active) {
    check(t.includes("Adult signature"), "adult-signature disclosure shows once cart is non-empty");
    const fee = `$${S.fee}`;
    const hits = (t.match(new RegExp(fee.replace(/[.$]/g, "\\$&"), "g")) || []).length;
    check(hits === 1, `${fee} stated exactly once, not per line item`, `${hits} occurrence(s)`);
  }
  const M = BRAND.minOrder || {};
  if (M.active) check(t.includes(M.heading), `minimum-order notice "${M.heading}" shown`);
  else check(!/minimum/i.test(t), "no minimum-order copy leaks when minOrder is off");
}

console.log(`\n${failed === 0 ? "PASS — all checks green" : `FAIL — ${failed} check(s) failed`}\n`);
process.exit(failed === 0 ? 0 : 1);
