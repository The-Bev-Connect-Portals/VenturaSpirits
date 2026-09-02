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

  //  Real hrefs, confirmed 200 on 2026-09-02. Do not infer these from the
  //  nav labels — "Visit" and "Stores" resolve to /pages/visit-us and
  //  /pages/store-locator, and the obvious guesses both 404.
  nav: [
    { label: "Shop",    href: "#grid" },
    { label: "Recipes", href: "https://venturaspirits.com/pages/recipes",       external: true },
    { label: "Visit",   href: "https://venturaspirits.com/pages/visit-us",      external: true },
    { label: "Stores",  href: "https://venturaspirits.com/pages/store-locator", external: true },
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
  //  LIVE as of 2026-09-02. Empty array = the portal reads the real catalog
  //  from Shopify. Products were created via the Admin GraphQL API, not
  //  Matrixify, and verified through this brand's own Storefront token.
  //  Repopulating this array would silently replace the live store with a
  //  preview, so don't — except to demo a brand with no Shopify catalog.
  demoProducts: [],
};
