// ─────────────────────────────────────────────────────────────
//  BRAND CONFIG — the only file that changes to onboard a client.
//
//  NOTE: portal-template is written for breweries. Ventura Spirits is a
//  distillery, so the vocabulary below (labels, filters, nav) has been
//  reworked rather than find-and-replaced. If you copy this file as the
//  basis for another spirits brand, start from THIS one, not the template.
// ─────────────────────────────────────────────────────────────

export const BRAND = {
  // ── Identity ──────────────────────────────────────────────
  //    slug                 ventura-spirits
  //    repo                 The-Bev-Connect-Portals/VenturaSpirits
  //    Shopify product tag  portal:ventura-spirits
  //    collection           portal-ventura-spirits
  //    cart attribute       portal = ventura-spirits
  //    Headless channel     Ventura Spirits (Publication/212731658459)
  //
  slug: "ventura-spirits",

  name: "Ventura Spirits",  // must match the Shopify title prefix EXACTLY
  logo: "/assets/logo.png",
  favicon: "/assets/favicon.png",

  // Their master lockup is the seagull over the VENTURA SPIRITS wordmark,
  // rendered from the official SVG in their own asset library, so the name
  // is already in the artwork.
  logoIncludesName: true,

  heroMark: null,
  heroBadge: null,

  // ── Look ──────────────────────────────────────────────────
  //  Sampled from venturaspirits.com, not invented. Their site is CREAM,
  //  not white — #F7F5E8 page with #E8E7DA card tiles.
  //
  //  ⚠ THE BRAND ORANGE CANNOT CARRY WHITE TEXT. Their #E79D46 against
  //    white is 2.26:1, a hard fail, and as text on their own cream it is
  //    2.06:1. Their site never asks it to — it puts DARK text on orange
  //    bands. So the orange lives in `gold`, which is the slot the theme
  //    already renders with --text on top, and `accent` is a darkened
  //    burnt orange from the same hue family that clears AA with white.
  //    Do not "restore" the brand orange to accent; it will fail contrast
  //    everywhere the theme puts white on it.
  colors: {
    bg:         "#F7F5E8",   // their cream page
    surface:    "#FFFFFF",   // product image tiles run white on their grid
    surfaceAlt: "#E8E7DA",   // their card tile
    text:       "#18181B",   // 16.2:1 on bg
    muted:      "#5E595C",   // their grey — 6.27:1 on bg, passes AA
    line:       "#DDD8C4",
    accent:     "#A85A0D",   // darkened from their orange; 5.08:1 with white
    accentText: "#FFFFFF",
    gold:       "#E79D46",   // their actual brand orange; carries --text at 7.85:1
  },

  //  Their headings are GT Standard (Grilli Type) — licensed, and we do not
  //  hold it. Their site already loads Poppins and Inter alongside it, both
  //  free on Google Fonts, so the stand-ins are faces the brand is already
  //  shipping rather than something we picked off a similarity chart.
  fonts: {
    display: "'Poppins', 'Futura', 'Helvetica Neue', sans-serif",
    body:    "'Inter', system-ui, sans-serif",
    googleFontsHref:
      "https://fonts.googleapis.com/css2?family=Poppins:wght@500;600;700" +
      "&family=Inter:wght@400;500;600&display=swap",
  },

  // ── Copy ──────────────────────────────────────────────────
  tagline: "California-distilled spirits and canned cocktails from Ventura, shipped to your door.",
  heroKicker: "Ventura, CA \u00b7 California Distilled",

  backToSiteUrl: "https://venturaspirits.com",
  backToSiteLabel: "Back to Main Site",

  nav: [
    { label: "Shop",    href: "#grid" },
    { label: "Recipes", href: "https://venturaspirits.com/pages/recipes", external: true },
    { label: "Visit",   href: "https://venturaspirits.com/pages/visit",   external: true },
    { label: "Stores",  href: "https://venturaspirits.com/pages/stores",  external: true },
  ],

  // Announcement bar. DISPLAY ONLY — never the enforcement layer. Do not
  // name states here; destination eligibility is decided at Shopify
  // checkout and nowhere else.
  //
  //  ⚠ Worth knowing why this portal exists: venturaspirits.com currently
  //    runs a site-wide ticker reading "Orders available for pickup at
  //    distillery only." They do not ship DTC today. Go-To Gifting's
  //    licence is what makes shipping possible, so this line is the single
  //    most load-bearing piece of copy on the page. Spirits ship to a
  //    NARROWER set of states than beer — confirm the list against the
  //    Shopify shipping profile before launch.
  shippingLine:
    "Shipping to select states. Enter your address at checkout to confirm.",

  labels: {
    filtersHeading:  "Category",
    emptyFilterTitle: "Nothing here yet",
    emptyFilterLine:  "No bottles match that filter right now. Try another category.",
    cartEmptyTitle:   "Your cart is empty.",
    cartEmptyLine:    "Add a few bottles and they'll show up here.",
    addLabel:         "Add",
    soldOutLabel:     "Sold out",
  },

  // ── Adult signature ───────────────────────────────────────
  //  Disclosure only. Applied at Shopify checkout as a shipping-rate
  //  component, ONCE PER ORDER — never multiplied by line count.
  adultSignature: {
    active: true,
    fee: 5.99,
    line: "Adult signature required on delivery \u2014 $5.99 per order, " +
          "added at checkout. Someone 21+ must be there to sign.",
  },

  presale: {
    active: false,
    label: "Pre-Sale Only",
    line: "Shipping soon",
    window: "",
    note: "You're pre-ordering. Your card is charged today and your order " +
          "ships as soon as stock lands.",
  },

  // ── Minimum order quantity ────────────────────────────────
  //  THE PORTAL DOES NOT ENFORCE THIS. Real enforcement is the Yuko
  //  validation function, scoped to portal-ventura-spirits.
  //
  //  ⚠ OFF ON PURPOSE. Beer portals run a 2-item minimum because a single
  //    six-pack does not carry the freight. Spirits do not have that
  //    problem: a single $75 bottle is a perfectly good order, and a
  //    2-bottle floor on a $75 item is a real conversion cost. Turn this
  //    on only if the shipping maths actually says so.
  minOrder: {
    active: false,
    qty: 1,
    scope: "cart",
    heading: "",
    line: "",
  },

  promo: { active: false, tickerText: "", line: "" },

  // ── Help widget ───────────────────────────────────────────
  //  ⚠ Netlify form detection must be enabled in the dashboard AND the site
  //    redeployed, or POSTs 404 with correct markup. Set the notification
  //    email under Site configuration → Forms, or nobody sees submissions.
  helpForm: {
    active: true,
    formName: "ventura-spirits-help",   // also set twice in index.html
    heading: "Need a hand?",
    line: "Questions about an order or shipping? Send a note and we'll " +
          "get back to you.",
    success: "Thanks \u2014 we've got it. We'll reply by email shortly.",
  },

  supportEmail: "james@gotogifting.com",
  supportPhone: "",

  // ── Filters ───────────────────────────────────────────────
  //  Mirrors the brand's own "Shop by Collection": Spirits / Canned
  //  Cocktails / Special Releases. Merch is their fourth collection and is
  //  deliberately absent — this portal ships alcohol only.
  filters: [
    { label: "All",              tag: null },
    { label: "Spirits",          tag: "spirits" },
    { label: "Canned Cocktails", tag: "canned-cocktail" },
    { label: "Special Releases", tag: "special-release" },
  ],

  // ── Shopify ───────────────────────────────────────────────
  productOrder: [
    "ventura-spirits-wilder-gin",
    "ventura-spirits-angeleno-amaro",
    "ventura-spirits-limoncello",
    "ventura-spirits-opuntia",
    "ventura-spirits-strawberry-thief-brandy",
    "ventura-spirits-strawberry-thief-liqueur",
    "ventura-spirits-limoncello-spritz",
    "ventura-spirits-angeleno-spritz",
    "ventura-spirits-pixie-collins",
    "ventura-spirits-prickly-paloma",
    "ventura-spirits-ojai-pixie-cello",
    "ventura-spirits-reppo-agave",
    "ventura-spirits-grapefruit-cordial",
    "ventura-spirits-apricot-umeshu",
    "ventura-spirits-pineau-bleu",
    "ventura-spirits-agave-liqueur",
  ],

  //  ⚠ Created by the Matrixify import's "Custom Collections" column — do
  //    NOT hand-create it. These portal collections are MANUAL, not smart;
  //    verified against portal-fig-mountain, which returns ruleSet: null.
  collectionHandle: "portal-ventura-spirits",

  shopDomain: "bro-basket.myshopify.com",

  //  Public Storefront token for the Ventura Spirits Headless storefront.
  //  Read-only and safe client-side. NEVER an Admin token here.
  //  Verified against bro-basket 2026-04 on 2026-09-02: authenticates as
  //  "The BroBasket" and returns the same 38-product baseline as the Fig
  //  Mountain and Topa Topa tokens, which is the expected shape.
  storefrontToken: "f4455ced9faf77197408bc52de3364f9",
  apiVersion: "2026-04",

  //  ⚠ Flow must key on the CART ATTRIBUTE, not product tags, and match
  //    `slug` exactly, or orders land untagged and commission cannot be
  //    calculated. Verify with a real test order before launch.
  sourceTag: "ventura-spirits",

  sellerOfRecord: "Go-To Gifting",
  sellerNote:
    "Checkout is handled by Go-To Gifting, our licensed retail partner.",

  // ── DEMO MODE ─────────────────────────────────────────────
  //  Non-empty array = the portal renders from here and never calls
  //  Shopify; checkout is disabled and says so plainly.
  //
  //  GOING LIVE IS ONE LINE: set demoProducts: [] once the import has run
  //  and the products are published to the Ventura Spirits Headless
  //  storefront. The token above is already verified.
  //
  //  Built from venturaspirits.com. Every item is forced inStock — this is
  //  a design preview, not an inventory mirror, and Prickly Paloma is
  //  actually sold out on their store today. Images hotlink their CDN.
  demoProducts: [
    {
      "id": "ventura-spirits-angeleno-amaro",
      "handle": "ventura-spirits-angeleno-amaro",
      "title": "Ventura Spirits - Angeleno Amaro",
      "tags": [
        "portal:ventura-spirits",
        "spirits"
      ],
      "description": "A California amaro built on local citrus and botanicals. Bittersweet, orange-forward and made to drink long over ice.",
      "specs": [
        "Amaro",
        "750 ml"
      ],
      "inStock": true,
      "image": "https://cdn.shopify.com/s/files/1/0284/4960/3670/files/Angeleno-Amaro-70-1000px.jpg?v=1783677000",
      "alt": "Angeleno Amaro",
      "price": {
        "amount": "35.00",
        "currencyCode": "USD"
      }
    },
    {
      "id": "ventura-spirits-wilder-gin",
      "handle": "ventura-spirits-wilder-gin",
      "title": "Ventura Spirits - Wilder Gin",
      "tags": [
        "portal:ventura-spirits",
        "spirits"
      ],
      "description": "Distilled with wild-harvested California botanicals, including sage and bay foraged from the hills above Ventura.",
      "specs": [
        "Gin",
        "750 ml"
      ],
      "inStock": true,
      "image": "https://cdn.shopify.com/s/files/1/0284/4960/3670/files/Wilder-Front-1000px.jpg?v=1755272824",
      "alt": "Wilder Gin",
      "price": {
        "amount": "35.00",
        "currencyCode": "USD"
      }
    },
    {
      "id": "ventura-spirits-limoncello",
      "handle": "ventura-spirits-limoncello",
      "title": "Ventura Spirits - Limoncello",
      "tags": [
        "portal:ventura-spirits",
        "spirits"
      ],
      "description": "Made from whole California lemons rather than concentrate. Bright, sharp and best served very cold.",
      "specs": [
        "Liqueur",
        "750 ml"
      ],
      "inStock": true,
      "image": "https://cdn.shopify.com/s/files/1/0284/4960/3670/files/Limoncello-Front-1000px.jpg?v=1755273000",
      "alt": "Limoncello",
      "price": {
        "amount": "30.00",
        "currencyCode": "USD"
      }
    },
    {
      "id": "ventura-spirits-opuntia",
      "handle": "ventura-spirits-opuntia",
      "title": "Ventura Spirits - Opuntia Prickly Pear Brandy",
      "tags": [
        "portal:ventura-spirits",
        "spirits"
      ],
      "description": "Distilled from wild prickly pear fruit hand-harvested across the Central Coast. Dry, floral and unlike anything else on the shelf.",
      "specs": [
        "Brandy",
        "750 ml"
      ],
      "inStock": true,
      "image": "https://cdn.shopify.com/s/files/1/0284/4960/3670/files/Opuntia-Front-1000px.jpg?v=1755273079",
      "alt": "Opuntia Prickly Pear Brandy",
      "price": {
        "amount": "45.00",
        "currencyCode": "USD"
      }
    },
    {
      "id": "ventura-spirits-strawberry-thief-brandy",
      "handle": "ventura-spirits-strawberry-thief-brandy",
      "title": "Ventura Spirits - Strawberry Thief Brandy",
      "tags": [
        "portal:ventura-spirits",
        "spirits"
      ],
      "description": "A five-year-old strawberry brandy, barrel-aged and made from California fruit. Small, slow and worth the wait.",
      "specs": [
        "Brandy",
        "750 ml"
      ],
      "inStock": true,
      "image": "https://cdn.shopify.com/s/files/1/0284/4960/3670/files/ST-Brandy-70-1000px.jpg?v=1783677012",
      "alt": "Strawberry Thief Brandy",
      "price": {
        "amount": "75.00",
        "currencyCode": "USD"
      }
    },
    {
      "id": "ventura-spirits-strawberry-thief-liqueur",
      "handle": "ventura-spirits-strawberry-thief-liqueur",
      "title": "Ventura Spirits - Strawberry Thief Liqueur",
      "tags": [
        "portal:ventura-spirits",
        "spirits"
      ],
      "description": "The brandy's softer sibling — strawberry-forward, lower proof and built for spritzes and long drinks.",
      "specs": [
        "Liqueur",
        "20.5% ABV",
        "750 ml"
      ],
      "inStock": true,
      "image": "https://cdn.shopify.com/s/files/1/0284/4960/3670/files/Strawberry-Thief-Liqueur-70-1000px.jpg?v=1783677024",
      "alt": "Strawberry Thief Liqueur",
      "price": {
        "amount": "35.00",
        "currencyCode": "USD"
      }
    },
    {
      "id": "ventura-spirits-limoncello-spritz",
      "handle": "ventura-spirits-limoncello-spritz",
      "title": "Ventura Spirits - Limoncello Spritz (4 Pack)",
      "tags": [
        "portal:ventura-spirits",
        "canned-cocktail"
      ],
      "description": "Their limoncello cut with sparkling California white wine. Lemon-bright and ready to go.",
      "specs": [
        "Canned Cocktail",
        "8% ABV",
        "4 x 355 ml"
      ],
      "inStock": true,
      "image": "https://cdn.shopify.com/s/files/1/0284/4960/3670/files/Cocktail-Can-Limoncello-Spritz-1000px.jpg?v=1755273784",
      "alt": "Limoncello Spritz (4 Pack)",
      "price": {
        "amount": "15.00",
        "currencyCode": "USD"
      }
    },
    {
      "id": "ventura-spirits-prickly-paloma",
      "handle": "ventura-spirits-prickly-paloma",
      "title": "Ventura Spirits - Prickly Paloma (4 Pack)",
      "tags": [
        "portal:ventura-spirits",
        "canned-cocktail"
      ],
      "description": "Prickly pear brandy with grapefruit, lime and soda. Currently sold out on the brand's own store.",
      "specs": [
        "Canned Cocktail",
        "6.5% ABV",
        "4 x 355 ml"
      ],
      "inStock": true,
      "image": "https://cdn.shopify.com/s/files/1/0284/4960/3670/files/Prickly-Paloma-1000px.jpg?v=1755273695",
      "alt": "Prickly Paloma (4 Pack)",
      "price": {
        "amount": "20.00",
        "currencyCode": "USD"
      }
    },
    {
      "id": "ventura-spirits-pixie-collins",
      "handle": "ventura-spirits-pixie-collins",
      "title": "Ventura Spirits - Pixie Collins (4 Pack)",
      "tags": [
        "portal:ventura-spirits",
        "canned-cocktail"
      ],
      "description": "Ojai pixie tangerine liqueur with lemon juice and soda — a Tom Collins with a Central Coast accent.",
      "specs": [
        "Canned Cocktail",
        "7.5% ABV",
        "4 x 355 ml"
      ],
      "inStock": true,
      "image": "https://cdn.shopify.com/s/files/1/0284/4960/3670/files/Cocktail-Can-Mockup.jpg?v=1755273590",
      "alt": "Pixie Collins (4 Pack)",
      "price": {
        "amount": "20.00",
        "currencyCode": "USD"
      }
    },
    {
      "id": "ventura-spirits-angeleno-spritz",
      "handle": "ventura-spirits-angeleno-spritz",
      "title": "Ventura Spirits - Angeleno Spritz (6 Pack)",
      "tags": [
        "portal:ventura-spirits",
        "canned-cocktail"
      ],
      "description": "Angeleno Amaro, sparkling wine and soda in a slim can. The house aperitivo, pre-mixed.",
      "specs": [
        "Canned Cocktail",
        "6 x 200 ml"
      ],
      "inStock": true,
      "image": "https://cdn.shopify.com/s/files/1/0284/4960/3670/files/Angeleno-Spritz-1000px.jpg?v=1755273436",
      "alt": "Angeleno Spritz (6 Pack)",
      "price": {
        "amount": "20.00",
        "currencyCode": "USD"
      }
    },
    {
      "id": "ventura-spirits-ojai-pixie-cello",
      "handle": "ventura-spirits-ojai-pixie-cello",
      "title": "Ventura Spirits - Ojai Pixie-Cello",
      "tags": [
        "portal:ventura-spirits",
        "special-release"
      ],
      "description": "Ojai pixie tangerines, peel and all, turned into a bright citrus liqueur. All pixie, no peeling.",
      "specs": [
        "Liqueur",
        "30% ABV",
        "750 ml"
      ],
      "inStock": true,
      "image": "https://cdn.shopify.com/s/files/1/0284/4960/3670/files/Pixiecello-Front-OLD-1000px.jpg?v=1783972548",
      "alt": "Ojai Pixie-Cello",
      "price": {
        "amount": "35.00",
        "currencyCode": "USD"
      }
    },
    {
      "id": "ventura-spirits-reppo-agave",
      "handle": "ventura-spirits-reppo-agave",
      "title": "Ventura Spirits - 'Reppo' California Agave Spirit",
      "tags": [
        "portal:ventura-spirits",
        "special-release"
      ],
      "description": "California-grown agave, roasted and distilled on site. A small, irregular release.",
      "specs": [
        "Agave Spirit",
        "42.5% ABV",
        "750 ml"
      ],
      "inStock": true,
      "image": "https://cdn.shopify.com/s/files/1/0284/4960/3670/files/Reppo-Front-1000px.jpg?v=1773506683",
      "alt": "'Reppo' California Agave Spirit",
      "price": {
        "amount": "75.00",
        "currencyCode": "USD"
      }
    },
    {
      "id": "ventura-spirits-agave-liqueur",
      "handle": "ventura-spirits-agave-liqueur",
      "title": "Ventura Spirits - Agave Liqueur",
      "tags": [
        "portal:ventura-spirits",
        "special-release"
      ],
      "description": "A sweeter, lower-proof take on their agave spirit, bottled at 375 ml.",
      "specs": [
        "Liqueur",
        "25% ABV",
        "375 ml"
      ],
      "inStock": true,
      "image": "https://cdn.shopify.com/s/files/1/0284/4960/3670/files/Agave_Liqueur-3-800px.heic?v=1763925289",
      "alt": "Agave Liqueur",
      "price": {
        "amount": "35.00",
        "currencyCode": "USD"
      }
    },
    {
      "id": "ventura-spirits-apricot-umeshu",
      "handle": "ventura-spirits-apricot-umeshu",
      "title": "Ventura Spirits - Apricot Umeshu",
      "tags": [
        "portal:ventura-spirits",
        "special-release"
      ],
      "description": "Green apricots steeped in the Japanese umeshu tradition, using California stone fruit.",
      "specs": [
        "Liqueur",
        "25% ABV",
        "375 ml"
      ],
      "inStock": true,
      "image": "https://cdn.shopify.com/s/files/1/0284/4960/3670/files/Umeshu-Bottle.jpg?v=1762766608",
      "alt": "Apricot Umeshu",
      "price": {
        "amount": "30.00",
        "currencyCode": "USD"
      }
    },
    {
      "id": "ventura-spirits-grapefruit-cordial",
      "handle": "ventura-spirits-grapefruit-cordial",
      "title": "Ventura Spirits - Grapefruit Cordial",
      "tags": [
        "portal:ventura-spirits",
        "special-release"
      ],
      "description": "A tart grapefruit cordial built for highballs and palomas.",
      "specs": [
        "Cordial",
        "750 ml"
      ],
      "inStock": true,
      "image": "https://cdn.shopify.com/s/files/1/0284/4960/3670/files/Grapefruit-Front-1000px_3377b5d5-5095-4de7-885c-3c27f5a7cff5.jpg?v=1755457392",
      "alt": "Grapefruit Cordial",
      "price": {
        "amount": "30.00",
        "currencyCode": "USD"
      }
    },
    {
      "id": "ventura-spirits-pineau-bleu",
      "handle": "ventura-spirits-pineau-bleu",
      "title": "Ventura Spirits - Pineau Bleu Blueberry Liqueur",
      "tags": [
        "portal:ventura-spirits",
        "special-release"
      ],
      "description": "Blueberries and brandy in the pineau style — deep, jammy and low proof.",
      "specs": [
        "Liqueur",
        "20% ABV",
        "375 ml"
      ],
      "inStock": true,
      "image": "https://cdn.shopify.com/s/files/1/0284/4960/3670/files/Pineau-Bleu-1000px_fd130dd8-d209-4f1f-a702-7cf03c70771a.jpg?v=1755457706",
      "alt": "Pineau Bleu Blueberry Liqueur",
      "price": {
        "amount": "35.00",
        "currencyCode": "USD"
      }
    }
  ],
};
