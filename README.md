# Selgeo mock merchants

Test fixture for Selgeo spec #085 v2 (deep E2E run for #086).

Three mocks under path-based routes:

- `/quillbeam` — Newsletter / Creator (freemium)
- `/cliperra` — EU AI Creator Tool (multi-currency)
- `/calltrace` — B2D Developer Infra (metered + OAuth)

All routes are `noindex,nofollow`. Hosting: Vercel free tier.

See `selgeo/affiliate-program` repo, `docs/superpowers/specs/2026-04-30-mock-landings-085-design.md` (v2) for the spec, and `docs/research/mocks/` for per-mock docs and findings.

## Local development

```bash
pnpm install
cp .env.example .env.local  # fill with values from Apple Passwords
pnpm dev
```

Open http://localhost:3000 — index of 3 mocks.

## Deployment

Auto-deployed by Vercel on push to `main`. Environment variables set in Vercel project settings.
