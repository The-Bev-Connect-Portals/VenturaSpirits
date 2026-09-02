#!/usr/bin/env python3
"""
Single source of truth for the Ventura Spirits portal catalog.

Generates, from one list:
  1. templates/ventura_spirits_matrixify_import.csv
  2. templates/demo_products.json   (pasted into brand.config.js)

Scope: 16 sellable alcohol SKUs. Their live catalog is 63 products, but 22 of
those are $0 "Digital Product" trade assets (sell sheets, logo files, bare
bottle renders for wholesalers) and 23 are merch. Neither belongs in a
shipping portal, so neither is here.

WEIGHTS — READ BEFORE CONFIGURING SHIPPING RATES.
Values below are carried through from venturaspirits.com unchanged. They are
NOT all correct, and nothing here is invented to paper over that. A full 750ml
spirit bottle runs roughly 1300-1500g; a 375ml runs roughly 650-950g. Measured
against that, the 375ml bottles are fine and four SKUs are wrong:

    strawberry-thief-liqueur     0g    missing outright
    reppo-california-agave       0g    missing outright
    strawberry-brandy          750g    750ml bottle — looks like the *volume*
                                       was typed into the weight field
    pixiecello                 816g    750ml bottle — same shape of error

Each is flagged `weight_suspect=True` and the CSV emits them with a
WEIGHT-CHECK tag so they are easy to pull up in Shopify admin. Under-weighted
spirits mean under-charged shipping, and Go-To Gifting absorbs that, so these
need real scale readings before rates go live.

Weight is product-only. Shopify adds box weight on top — do not pad.
"""
import csv, json

SLUG   = "ventura-spirits"
BRAND  = "Ventura Spirits"
COLL   = "portal-ventura-spirits"

P = [
    # ── Spirits ───────────────────────────────────────────────
    dict(h="ventura-spirits-angeleno-amaro", name="Angeleno Amaro", price="35.00",
         sku="VS-ANGELENO-750", grams=1315, cat="Spirits", tags=["spirits"],
         style="Amaro", size="750 ml", abv="",
         desc="A California amaro built on local citrus and botanicals. Bittersweet, "
              "orange-forward and made to drink long over ice.",
         img="https://cdn.shopify.com/s/files/1/0284/4960/3670/files/Angeleno-Amaro-70-1000px.jpg?v=1783677000"),
    dict(h="ventura-spirits-wilder-gin", name="Wilder Gin", price="35.00",
         sku="VS-WILDER-750", grams=1406, cat="Spirits", tags=["spirits"],
         style="Gin", size="750 ml", abv="",
         desc="Distilled with wild-harvested California botanicals, including sage and "
              "bay foraged from the hills above Ventura.",
         img="https://cdn.shopify.com/s/files/1/0284/4960/3670/files/Wilder-Front-1000px.jpg?v=1755272824"),
    dict(h="ventura-spirits-limoncello", name="Limoncello", price="30.00",
         sku="VS-LIMONCELLO-750", grams=1451, cat="Spirits", tags=["spirits"],
         style="Liqueur", size="750 ml", abv="",
         desc="Made from whole California lemons rather than concentrate. Bright, "
              "sharp and best served very cold.",
         img="https://cdn.shopify.com/s/files/1/0284/4960/3670/files/Limoncello-Front-1000px.jpg?v=1755273000"),
    dict(h="ventura-spirits-opuntia", name="Opuntia Prickly Pear Brandy", price="45.00",
         sku="VS-OPUNTIA-750", grams=1406, cat="Spirits", tags=["spirits"],
         style="Brandy", size="750 ml", abv="",
         desc="Distilled from wild prickly pear fruit hand-harvested across the "
              "Central Coast. Dry, floral and unlike anything else on the shelf.",
         img="https://cdn.shopify.com/s/files/1/0284/4960/3670/files/Opuntia-Front-1000px.jpg?v=1755273079"),
    dict(h="ventura-spirits-strawberry-thief-brandy", name="Strawberry Thief Brandy",
         price="75.00", sku="VS-STRAWTHIEF-BRANDY-750", grams=750, weight_suspect=True,
         cat="Spirits", tags=["spirits"], style="Brandy", size="750 ml", abv="",
         desc="A five-year-old strawberry brandy, barrel-aged and made from California "
              "fruit. Small, slow and worth the wait.",
         img="https://cdn.shopify.com/s/files/1/0284/4960/3670/files/ST-Brandy-70-1000px.jpg?v=1783677012"),
    dict(h="ventura-spirits-strawberry-thief-liqueur", name="Strawberry Thief Liqueur",
         price="35.00", sku="VS-STRAWTHIEF-LIQ-750", grams=0, weight_suspect=True,
         cat="Spirits", tags=["spirits"], style="Liqueur", size="750 ml", abv="20.5% ABV",
         desc="The brandy's softer sibling — strawberry-forward, lower proof and "
              "built for spritzes and long drinks.",
         img="https://cdn.shopify.com/s/files/1/0284/4960/3670/files/Strawberry-Thief-Liqueur-70-1000px.jpg?v=1783677024"),

    # ── Canned cocktails ──────────────────────────────────────
    dict(h="ventura-spirits-limoncello-spritz", name="Limoncello Spritz (4 Pack)",
         price="15.00", sku="VS-LIMSPRITZ-4PK", grams=1451, cat="Canned Cocktail",
         tags=["canned-cocktail"], style="Canned Cocktail", size="4 x 355 ml", abv="8% ABV",
         desc="Their limoncello cut with sparkling California white wine. Lemon-bright "
              "and ready to go.",
         img="https://cdn.shopify.com/s/files/1/0284/4960/3670/files/Cocktail-Can-Limoncello-Spritz-1000px.jpg?v=1755273784"),
    dict(h="ventura-spirits-prickly-paloma", name="Prickly Paloma (4 Pack)",
         price="20.00", sku="VS-PALOMA-4PK", grams=1451, cat="Canned Cocktail",
         tags=["canned-cocktail"], style="Canned Cocktail", size="4 x 355 ml", abv="6.5% ABV",
         desc="Prickly pear brandy with grapefruit, lime and soda. Currently sold out "
              "on the brand's own store.",
         img="https://cdn.shopify.com/s/files/1/0284/4960/3670/files/Prickly-Paloma-1000px.jpg?v=1755273695"),
    dict(h="ventura-spirits-pixie-collins", name="Pixie Collins (4 Pack)",
         price="20.00", sku="VS-PIXIECOLLINS-4PK", grams=1451, cat="Canned Cocktail",
         tags=["canned-cocktail"], style="Canned Cocktail", size="4 x 355 ml", abv="7.5% ABV",
         desc="Ojai pixie tangerine liqueur with lemon juice and soda — a Tom Collins "
              "with a Central Coast accent.",
         img="https://cdn.shopify.com/s/files/1/0284/4960/3670/files/Cocktail-Can-Mockup.jpg?v=1755273590"),
    dict(h="ventura-spirits-angeleno-spritz", name="Angeleno Spritz (6 Pack)",
         price="20.00", sku="VS-ANGSPRITZ-6PK", grams=1361, cat="Canned Cocktail",
         tags=["canned-cocktail"], style="Canned Cocktail", size="6 x 200 ml", abv="",
         desc="Angeleno Amaro, sparkling wine and soda in a slim can. The house "
              "aperitivo, pre-mixed.",
         img="https://cdn.shopify.com/s/files/1/0284/4960/3670/files/Angeleno-Spritz-1000px.jpg?v=1755273436"),

    # ── Special releases ──────────────────────────────────────
    dict(h="ventura-spirits-ojai-pixie-cello", name="Ojai Pixie-Cello", price="35.00",
         sku="VS-PIXIECELLO-750", grams=816, weight_suspect=True, cat="Special Release",
         tags=["special-release"], style="Liqueur", size="750 ml", abv="30% ABV",
         desc="Ojai pixie tangerines, peel and all, turned into a bright citrus "
              "liqueur. All pixie, no peeling.",
         img="https://cdn.shopify.com/s/files/1/0284/4960/3670/files/Pixiecello-Front-OLD-1000px.jpg?v=1783972548"),
    dict(h="ventura-spirits-reppo-agave", name="'Reppo' California Agave Spirit",
         price="75.00", sku="VS-REPPO-750", grams=0, weight_suspect=True,
         cat="Special Release", tags=["special-release"], style="Agave Spirit",
         size="750 ml", abv="42.5% ABV",
         desc="California-grown agave, roasted and distilled on site. A small, "
              "irregular release.",
         img="https://cdn.shopify.com/s/files/1/0284/4960/3670/files/Reppo-Front-1000px.jpg?v=1773506683"),
    dict(h="ventura-spirits-agave-liqueur", name="Agave Liqueur", price="35.00",
         sku="VS-AGAVELIQ-375", grams=907, cat="Special Release",
         tags=["special-release"], style="Liqueur", size="375 ml", abv="25% ABV",
         desc="A sweeter, lower-proof take on their agave spirit, bottled at 375 ml.",
         img="https://cdn.shopify.com/s/files/1/0284/4960/3670/files/Agave_Liqueur-3-800px.heic?v=1763925289"),
    dict(h="ventura-spirits-apricot-umeshu", name="Apricot Umeshu", price="30.00",
         sku="VS-UMESHU-375", grams=907, cat="Special Release",
         tags=["special-release"], style="Liqueur", size="375 ml", abv="25% ABV",
         desc="Green apricots steeped in the Japanese umeshu tradition, using "
              "California stone fruit.",
         img="https://cdn.shopify.com/s/files/1/0284/4960/3670/files/Umeshu-Bottle.jpg?v=1762766608"),
    dict(h="ventura-spirits-grapefruit-cordial", name="Grapefruit Cordial", price="30.00",
         sku="VS-GRAPEFRUIT-750", grams=1451, cat="Special Release",
         tags=["special-release"], style="Cordial", size="750 ml", abv="",
         desc="A tart grapefruit cordial built for highballs and palomas.",
         img="https://cdn.shopify.com/s/files/1/0284/4960/3670/files/Grapefruit-Front-1000px_3377b5d5-5095-4de7-885c-3c27f5a7cff5.jpg?v=1755457392"),
    dict(h="ventura-spirits-pineau-bleu", name="Pineau Bleu Blueberry Liqueur",
         price="35.00", sku="VS-PINEAUBLEU-375", grams=680, cat="Special Release",
         tags=["special-release"], style="Liqueur", size="375 ml", abv="20% ABV",
         desc="Blueberries and brandy in the pineau style — deep, jammy and low proof.",
         img="https://cdn.shopify.com/s/files/1/0284/4960/3670/files/Pineau-Bleu-1000px_fd130dd8-d209-4f1f-a702-7cf03c70771a.jpg?v=1755457706"),
]

COLS = ["Handle", "Title", "Body HTML", "Vendor", "Type", "Tags", "Tags Command",
        "Status", "Published", "Custom Collections", "Option1 Name",
        "Option1 Value", "Variant SKU", "Variant Price",
        "Variant Inventory Tracker", "Variant Inventory Policy",
        "Variant Fulfillment Service", "Variant Requires Shipping",
        "Variant Taxable", "Variant Grams", "Variant Weight Unit",
        "Image Src", "Image Position", "Image Alt Text"]


def title(p):  return f"{BRAND} - {p['name']}"
def specs(p):  return [s for s in (p["style"], p["abv"], p["size"]) if s]
def body(p):   return f"<p>{p['desc']}</p><ul>" + "".join(f"<li>{s}</li>" for s in specs(p)) + "</ul>"
def tags(p):
    t = [f"portal:{SLUG}"] + p["tags"]
    if p.get("weight_suspect"): t.append("WEIGHT-CHECK")
    return ", ".join(t)


with open("templates/ventura_spirits_matrixify_import.csv", "w", newline="",
          encoding="utf-8") as f:
    w = csv.writer(f); w.writerow(COLS)
    for p in P:
        w.writerow([
            p["h"], title(p), body(p), BRAND, "Craft Spirits", tags(p), "MERGE",
            "active", "FALSE", COLL, "Size", p["size"], p["sku"], p["price"],
            "shopify", "deny", "manual", "TRUE", "TRUE", p["grams"], "g",
            p["img"] or "", "1" if p["img"] else "", p["name"] if p["img"] else "",
        ])

demo = [{
    "id": p["h"], "handle": p["h"], "title": title(p),
    "tags": [f"portal:{SLUG}"] + p["tags"],
    "description": p["desc"], "specs": specs(p), "inStock": True,
    "image": p["img"], "alt": p["name"],
    "price": {"amount": p["price"], "currencyCode": "USD"},
} for p in P]

with open("templates/demo_products.json", "w", encoding="utf-8") as f:
    json.dump(demo, f, indent=2, ensure_ascii=False)

miss_img = [p["h"] for p in P if not p["img"]]
suspect  = [p["h"] for p in P if p.get("weight_suspect")]
print(f"{len(P)} products -> CSV + demo_products.json")
print(f"  weight needs checking ({len(suspect)}): {', '.join(suspect)}")
print(f"  no image yet ({len(miss_img)}): {', '.join(miss_img)}")
