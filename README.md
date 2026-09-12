# Ventura Spirits — Bev Connect Portal

Built from `portal-template` on 2026-09-02. Seller of record is Go-To Gifting LLC.

**Migrated 2026-09-11:** backend moved from the shared `bro-basket` store to
`aliquorshop` (BoozeFinders), where the catalog is now sold. The 16 SKUs also
still exist on go-togifting.com under identical handles — decide whether those
get unpublished before this is pointed at a public domain.

| | |
|---|---|
| Slug | `ventura-spirits` |
| Live brand site | https://venturaspirits.com |
| Shopify backend | `aliquorshop.myshopify.com` (Booze Finders) |
| Headless storefront | Ventura Spirits (`headless/374742`) |
| Collection handle | `portal-ventura-spirits` (SMART — tag `portal:ventura-spirits`) |
| Cart attribute | `portal = ventura-spirits` |
| Catalog | 16 SKUs — alcohol only; merch and $0 trade assets excluded |
| Portal domain | Netlify default for now |

## Status

- [x] Config filled; palette sampled from the live site, type resolved
- [x] Logo and favicon rendered from their official SVG
- [x] Matrixify CSV built; all 16 image URLs verified 200
- [x] Storefront token verified against aliquorshop 2026-04 (auth: "Booze Finders")
- [x] Render smoke test passing
- [ ] **Real weights for the 4 flagged SKUs** (see `templates/README-import.md`)
- [x] Catalog loaded (Admin GraphQL, not Matrixify — 16 products)
- [x] Products published to the Ventura Spirits Headless channel on BoozeFinders
- [ ] **Publish the `portal-ventura-spirits` COLLECTION to that same channel** — products alone are not enough; the grid renders empty until this is done
- [ ] Netlify site, form detection enabled + redeployed, notification email set
- [ ] Shopify Flow rule on cart attribute `portal = ventura-spirits`
- [ ] Confirm the shipping-eligible state list for SPIRITS (narrower than beer)
- [x] Demo-to-live flip done — portal reads the live catalog

**LIVE.** The grid reads the real Shopify catalog. Two SKUs are live with 0 g
weight — see `templates/README-import.md` before configuring shipping rates.

## This is a distillery, not a brewery

`portal-template` is brewery-shaped throughout. This config reworks the
vocabulary rather than find-and-replacing it: filters follow the brand's own
Spirits / Canned Cocktails / Special Releases split, empty states say
"bottles" not "beers", and nav mirrors their Recipes / Visit / Stores.

Two substantive departures from the beer portals:

**The 2-item minimum is off.** Beer portals run it because one six-pack
doesn't carry the freight. A single $75 bottle is a perfectly good spirits
order, and a 2-bottle floor on a $75 item is a real conversion cost. Turn it
on only if the shipping maths says so.

**The brand orange cannot carry white text.** Their `#E79D46` is 2.26:1
against white — a hard fail — and 2.06:1 as text on their own cream. Their
site never asks it to; it puts dark text on orange bands. So the orange sits
in `gold` (the slot the theme renders with `--text` on top) and `accent` is a
darkened burnt orange from the same hue family that clears AA. Do not
"restore" the brand orange to `accent`.

## Note on app.js

Taken from `Fig_Mountain_Brewing`, not `portal-template`, for the stale
demo-cart purge — see the Topa Topa repo for the full explanation. **Still
needs backporting to `portal-template`.**
