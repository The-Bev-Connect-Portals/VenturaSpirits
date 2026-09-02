# Ventura Spirits — Bev Connect Portal

Built from `portal-template` on 2026-09-02. Seller of record is Go-To Gifting LLC.

| | |
|---|---|
| Slug | `ventura-spirits` |
| Live brand site | https://venturaspirits.com |
| Shopify backend | `bro-basket.myshopify.com` (shared) |
| Headless publication | `gid://shopify/Publication/212731658439` |
| Collection handle | `portal-ventura-spirits` |
| Cart attribute | `portal = ventura-spirits` |
| Catalog | 16 SKUs — alcohol only; merch and $0 trade assets excluded |
| Portal domain | Netlify default for now |

## Status

- [x] Config filled; palette sampled from the live site, type resolved
- [x] Logo and favicon rendered from their official SVG
- [x] Matrixify CSV built; all 16 image URLs verified 200
- [x] Storefront token verified against bro-basket 2026-04
- [x] Render smoke test passing
- [ ] **Real weights for the 4 flagged SKUs** (see `templates/README-import.md`)
- [ ] Matrixify import run
- [ ] Products published to publication `212731658439`
- [ ] Netlify site, form detection enabled + redeployed, notification email set
- [ ] Shopify Flow rule on cart attribute `portal = ventura-spirits`
- [ ] Confirm the shipping-eligible state list for SPIRITS (narrower than beer)
- [ ] Demo-to-live flip (`demoProducts: []`)

**Currently in demo mode.**

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
