# Selgeo mock merchants

Test fixture for Selgeo spec #085 v2 (deep E2E run for #086).

Three mocks under path-based routes:

- [`/quillbeam`](https://mock-merchants.vercel.app/quillbeam) — Newsletter / Creator (freemium, light/amber, single tier $43/mo)
- [`/cliperra`](https://mock-merchants.vercel.app/cliperra) — EU AI Creator (multi-currency, light/purple, USD $29 / EUR €27 / GBP £23 / MXN MX$549)
- [`/calltrace`](https://mock-merchants.vercel.app/calltrace) — B2D Developer Infra (mock GitHub OAuth, dark/blue, single tier $49/mo)

All routes are `noindex,nofollow`. Hosting: Vercel free tier (Hobby plan).

See `selgeo/affiliate-program` repo, `docs/superpowers/specs/2026-04-30-mock-landings-085-design.md` for the v2 design and `docs/research/mocks/` for per-mock docs and findings.

## Local development

```bash
pnpm install
cp .env.example .env.local  # fill with values from Apple Passwords
pnpm dev
```

Open <http://localhost:3000> — index of 3 mocks.

## How to use (E2E test gauntlet)

Once a mock is deployed and connected to its Selgeo merchant + Stripe account, the test gauntlet for each mock is identical:

### 1. Register a test partner

Open the merchant's Selgeo program in `staging.selgeo.com` (Test mode), open **Programs → Invites → Create invite**, copy the invite URL, register a test partner via the invite link. Use a Gmail `+aliases` of your shared dev account so each test partner is distinct.

### 2. Create a referral link

In Partner Portal → **My Links → Create referral link**, target the mock's URL (e.g. `https://mock-merchants.vercel.app/cliperra`). Copy the generated `?ref=<token>` URL.

### 3. Click attribution

Open the tracking URL in a fresh incognito window. The Selgeo snippet runs, POSTs to `/v1/clicks` with the `ref` token, and stores `__selgeo_cid` + `__selgeo_vtk` in `sessionStorage`. Verify via DevTools → Application → Session Storage. In Selgeo dashboard (Test mode!), Partner Performance shows **Clicks: 1**.

### 4. Lead conversion (free signup)

Click the mock's signup CTA, submit any email. The mock's `/api/<slug>/track-lead` route POSTs to Selgeo Conversion API as `event_type=lead, amount_cents=0`. Attribution Log shows the lead within ~5 sec.

### 5. Paid upgrade

From the mock's dashboard, click **Upgrade**. The upgrade page reads `sessionStorage.__selgeo_cid` (and `localStorage.cliperra-currency` for Cliperra), POSTs to `/api/<slug>/checkout`, which creates a Stripe Checkout session with `client_reference_id` set to the click ID. Pay with Stripe test card `4242 4242 4242 4242`, any future expiry, any CVC.

### 6. Verify in Selgeo

Stripe webhook fires `checkout.session.completed` → Selgeo creates a conversion record + a commission row (program's rate × paid amount, in the basis currency). Attribution Log + Commissions show the result within ~60 sec.

For Cliperra multi-currency: repeat steps 3-6 four times, one per currency (USD/EUR/GBP/MXN), in separate incognito windows. Each conversion is stored in its basis currency.

## Adding a new mock

1. Create a new Stripe test-mode account, register one Product + Price (or per-currency Prices for multi-currency archetypes). Save the publishable, secret, and restricted keys in Apple Passwords.
2. Create a new Selgeo merchant on `staging.selgeo.com` (Test mode), Settings → Stripe → Connect using the Restricted Key. Take the Selgeo `pk_test_*` + `sk_test_*` from Settings → API Keys. Create a program, generate an invite.
3. Scaffold the new mock route under `app/<slug>/` mirroring the existing patterns. The Quillbeam mock (`app/quillbeam/`) is the cleanest single-tier reference; Cliperra (`app/cliperra/`) extends it with multi-currency.
4. Add env vars to `.env.example` (placeholders only, never real values) and `.env.local` (real values, gitignored).
5. **Set env vars in Vercel project settings** — for all three environments (Production, Preview, Development).
6. Push to `main` → Vercel auto-deploys.
7. **⚠ Gotcha — manual Vercel rebuild needed when adding `NEXT_PUBLIC_*` vars to an already-built deployment.** Next.js inlines `NEXT_PUBLIC_*` at build time, so post-build env changes need a rebuild. After adding env vars via Vercel UI, go to **Deployments → latest production deploy → … menu → Redeploy** with **"Use existing Build Cache" unchecked**.

## Deployment

Auto-deployed by Vercel on push to `main`. Environment variables set in Vercel project settings (Production + Preview + Development scopes).

`.env.example` lists the keys needed; real values live only in Vercel UI + each developer's local `.env.local` (gitignored).
