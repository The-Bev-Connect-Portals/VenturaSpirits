# Catalog load — Ventura Spirits

## What actually happened (2026-09-02)
The catalog was **not** loaded with Matrixify. All 16 products were created
directly through the Admin GraphQL API (`productSet`). The CSV below is kept
as the record of intent and as a fallback, but it was not the mechanism.

What was created:

- Collection `portal-ventura-spirits` — `gid://shopify/Collection/540875653339`,
  manual (`ruleSet: null`).
- 16 products, ACTIVE, published to `gid://shopify/Publication/212731658459`.
- Verified through this brand's own Storefront token: 16/16 visible,
  16/16 `availableForSale`.

## ⚠ inventoryPolicy must be CONTINUE, not DENY
Created with `DENY` first (what the CSV said) and all 16 came back
`availableForSale: false` — tracked inventory at zero stock reads as sold out,
so the grid would have been entirely sold-out cards. Fig Mountain runs
`CONTINUE` on every SKU, which is what lets a portal sell while Go-To Gifting
fulfils from brand-held stock. All 16 corrected; CSV updated to match.

## ⚠ Still outstanding on the live catalog
- **Two SKUs are live with 0 g weight**: `ventura-spirits-reppo-agave` and
  `ventura-spirits-strawberry-thief-liqueur`. Two more carry suspect weights
  (`strawberry-thief-brandy` 750 g, `ojai-pixie-cello` 816 g — both 750 ml
  bottles). All four are tagged `WEIGHT-CHECK`; find them in admin with
  `tag:WEIGHT-CHECK`. Zero-weight spirits will quote nonsense shipping.
- **Agave Liqueur has no image.** Their only asset is a `.heic`, which
  browsers render unreliably, so it was deliberately not attached. The
  product will show a placeholder until a JPEG arrives.

---


## Files
- `ventura_spirits_matrixify_import.csv` — 16 rows, alcohol only.
- `build_products.py` — the generator. Copy, prices, sizes, ABV and image
  URLs live here and nowhere else; the CSV and the `demoProducts` block in
  `brand.config.js` are both derived from it. Edit the script, re-run, re-paste.
  Do not hand-edit the CSV.
- `smoke-test.mjs` — brand-agnostic render check (see below).

## Scope: why 16 and not 63
Their catalog is 63 products. Excluded:

- **22 "Digital Product" entries** at $0.00 — sell sheets, logo files, and
  bare bottle renders published for wholesalers and distributors. These are
  trade assets sitting in the retail catalog. Importing them would put
  free downloads in a shipping portal.
- **23 merch SKUs** — apparel, hats, pins, glassware, gift card. Out of
  scope, same call as Topa Topa.
- **Gift Box + Tasting Glasses** ($60) and **Kernza Whiskey Sample Set**
  ($100) — both zero-weight, and the sample set is sold out. Judgement
  calls rather than obvious excludes; say the word and they go in.

That leaves 6 spirits, 4 canned cocktails, and 6 special releases.

## ⚠ Weights — fix before configuring shipping rates
Values are carried through from their site unchanged; nothing is invented.
A full 750ml bottle runs ~1300-1500g and a 375ml ~650-950g. The 375ml
bottles check out. Four do not:

| Handle | Stated | Problem |
|---|---|---|
| `ventura-spirits-strawberry-thief-liqueur` | 0 g | missing outright |
| `ventura-spirits-reppo-agave` | 0 g | missing outright |
| `ventura-spirits-strawberry-thief-brandy` | 750 g | 750ml bottle — looks like the volume was typed into the weight field |
| `ventura-spirits-ojai-pixie-cello` | 816 g | 750ml bottle — same shape of error |

All four carry a `WEIGHT-CHECK` tag so they can be pulled up in admin with
`tag:WEIGHT-CHECK`. Under-weighted spirits mean under-charged shipping, and
Go-To Gifting absorbs the difference. These need real scale readings.

Weight is product-only — Shopify adds box weight on top. Do not pad.

## Row cap
16 rows clears the 25-row Matrixify plan cap that truncated Fig Mountain's
import. Still verify the count afterward; the cap fails silently from the
bottom of the file.

## Before the portal can see anything
Three things must be true, and the Storefront API cannot tell them apart —
all three failure modes return an absent product:

1. The products are imported.
2. The collection `portal-ventura-spirits` exists. **Do not create it by
   hand** — the CSV's `Custom Collections` column creates and fills it.
   These are MANUAL collections, not smart ones; `portal-fig-mountain`
   returns `ruleSet: null` despite what the template comments claim.
3. The products are published to the Ventura Spirits Headless storefront,
   `gid://shopify/Publication/212731658459`. Publishing is a separate step
   from importing and is the usual reason a grid comes up empty.

Verify all three:

    curl -s -X POST https://bro-basket.myshopify.com/api/2026-04/graphql.json \
      -H 'Content-Type: application/json' \
      -H 'X-Shopify-Storefront-Access-Token: f4455ced9faf77197408bc52de3364f9' \
      -d '{"query":"{ collection(handle:\"portal-ventura-spirits\"){ products(first:50){ edges{ node{ handle availableForSale } } } } }"}'

Expect 16 handles. Only then set `demoProducts: []`.

## Render smoke test
`smoke-test.mjs` drives the real `assets/app.js` against `brand.config.js`
in jsdom — no browser, no network. It derives every assertion from the
config, so it is brand-agnostic and worth copying to other portals.

    cd templates && npm i jsdom && node smoke-test.mjs

It checks the palette variables land, the grid renders every product, each
price appears, every filter matches at least one product (a filter with zero
matches hides itself, so gaps are otherwise silent), the adult-signature fee
appears exactly once rather than per line item, and no minimum-order copy
leaks when `minOrder` is off. Exits non-zero on failure.

## Known content issues
- `ventura-spirits-agave-liqueur` hotlinks a **`.heic`** image. Browser
  support for HEIC is poor and it may not render. Ask for a JPEG.
- Their `Agave Liqueur` lives under the handle `persimmon-liqueur-copy` on
  their store — a duplicated product whose handle was never updated. Ours
  uses a clean handle, so do not expect the two to line up.
- `Prickly Paloma` is sold out on their store. Demo mode forces everything
  in stock; real availability arrives with the live flip.
