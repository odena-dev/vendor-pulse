
## Goal

Turn Vendor Pulse from a single operator app into a true two-sided SaaS: an **Admin** experience (what exists today) and a brand-new **Vendor** portal, selected at login. Also add `/changelog` and `/docs` to round out the marketing surface.

---

## 1. Persona-based login

Update `src/routes/login.tsx`:
- Add a segmented "I am a…" toggle: **Marketplace Admin** / **Vendor Partner**
- On submit, store `vp_auth` + `vp_role` (`"admin" | "vendor"`) in `localStorage`
- Redirect: admin → `/dashboard`, vendor → `/vendor`
- Update copy on the brand panel based on selected persona (subtle, e.g. "Master your marketplace" vs "Grow on the marketplace")

Add a tiny `src/lib/auth.ts` helper exposing `getRole()`, `setRole()`, `signOut()`.

## 2. Vendor portal routes

New routes under `src/routes/vendor.*.tsx` (flat dot convention):

| Route | Purpose |
|---|---|
| `/vendor` (overview) | Vendor's own KPIs: revenue, orders, rating, payout balance, sparkline trends |
| `/vendor/orders` | Their order table with filters + status |
| `/vendor/payouts` | Payout history, next payout date, balance card |
| `/vendor/insights` | Benchmarks: their rank vs marketplace median (anonymized), category trends |
| `/vendor/reviews` | Recent customer reviews + response composer |
| `/vendor/settings` | Storefront profile, payout details, notifications |

All built with the existing dark glass design system (`glass-card`, `gradient-primary`, KPI sparklines, Recharts).

## 3. Shared layout, different navs

- Rename current `AppLayout` internals to accept a `variant: "admin" | "vendor"`
- New `VendorSidebar` component (mirrors `AppSidebar` styling) with vendor-specific items + a "Marketplace Health Score" widget at the bottom instead of cross-vendor stats
- New `VendorMobileNav` for the mobile bottom bar
- Topbar shows persona badge ("Vendor · Acme Coffee Co.") with a "Switch role" menu item that clears `vp_role` and bounces back to `/login`

## 4. Mock data extension

Extend `src/lib/mock-data.ts`:
- Pick one vendor as the "logged-in vendor" (e.g. first entry)
- Add `vendorOrders`, `vendorPayouts`, `vendorReviews`, `vendorBenchmarks` arrays scoped to that vendor
- Keep all admin data untouched

## 5. Marketing additions

- **`/changelog`** — Linear-style timeline: version, date, tags (New / Improved / Fixed), short entries. 6–8 mock releases.
- **`/docs`** — Stripe-style two-column layout: left sidebar nav (Getting Started, Authentication, Vendors API, Webhooks, Rate Limits), right content with headings, prose, and a couple of `<pre>` code samples. Static mock content, no real backend.
- Add both to the landing-page footer and top nav.

## 6. Small polish

- Landing page hero CTA → "Get started" goes to `/login`; add a secondary "I'm a vendor" link that pre-selects the vendor persona via `?as=vendor` query param.
- 404 page already exists — no change.

---

### Technical notes

- Pure frontend; no backend or Cloud needed (matches current mock-data approach).
- File naming uses TanStack flat convention: `vendor.tsx` (layout w/ `<Outlet />`), `vendor.index.tsx`, `vendor.orders.tsx`, etc.
- Role guard is a lightweight `beforeLoad` on `vendor.tsx` and on the existing admin routes (redirects to `/login` if role mismatch). Not a real security boundary — purely UX since auth is mocked.
- Each new route gets its own `head()` with unique title + description.
- No new dependencies.

### Out of scope (can do later)

- Public `/marketplace/vendors/$id` SEO pages
- Vendor onboarding wizard
- Real auth via Lovable Cloud
