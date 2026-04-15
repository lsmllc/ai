# Charlevoix Chalet Evaluator (Phase 1 MVP)

A Next.js + TypeScript + Prisma + PostgreSQL web app for manually evaluating chalet listings in Charlevoix.

## Planned architecture (before implementation)

### Core modules
- **Web UI (Next.js App Router)**
  - Dashboard with sortable property ranking
  - Property detail page with scoring explanation
  - Add property form for manual listing intake
- **Application layer**
  - Server action to validate + save properties
  - Local scoring engine (no AI in Phase 1)
- **Data layer (Prisma + Postgres)**
  - `Property` model containing inputs, listing text, and score breakdown JSON
  - Seed script with 8 fake chalets

### Data flow
1. User adds a property from `/properties/new`.
2. Form values are validated via `zod`.
3. Local scoring engine computes a 100-point score + breakdown.
4. Property is persisted in PostgreSQL via Prisma.
5. Dashboard and detail pages read scored data from the DB.

## File tree

```text
.
├── app
│   ├── actions.ts
│   ├── globals.css
│   ├── layout.tsx
│   ├── page.tsx
│   └── properties
│       ├── [id]
│       │   └── page.tsx
│       └── new
│           └── page.tsx
├── lib
│   ├── prisma.ts
│   ├── scoring.ts
│   └── validators.ts
├── prisma
│   ├── schema.prisma
│   └── seed.ts
├── .env.example
├── next.config.ts
├── package.json
├── tsconfig.json
└── README.md
```

## Scoring model (100 points)

- Price to size fit: **20 points**
- Location access (ski + village distance): **20 points**
- Capacity utility (guests + bedrooms + bathrooms): **20 points**
- Bike/outdoor access: **15 points**
- Condition: **15 points**
- Rental revenue potential: **15 points**

Total: **100 points** max.

## Quick start

1. Install dependencies:
   ```bash
   npm install
   ```
2. Configure environment:
   ```bash
   cp .env.example .env
   ```
3. Set `DATABASE_URL` in `.env` to a PostgreSQL database.
4. Run migrations and seed:
   ```bash
   npm run prisma:generate
   npm run prisma:migrate -- --name init
   npm run prisma:seed
   ```
5. Start app:
   ```bash
   npm run dev
   ```

Open `http://localhost:3000`.

## Notes

- This MVP intentionally avoids scraping.
- Listing text is manually pasted and stored for future AI analysis.
- Phase 1 is intentionally simple and extensible.
