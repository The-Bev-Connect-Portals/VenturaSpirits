# Matrixify import — Ventura Spirits

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
