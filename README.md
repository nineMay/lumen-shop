# Lumen Shop

Vite + React + Ant Design demo shop for overseas consumers. English UI, USD, worldwide shipping copy. No backend, login, or real payment.

## Local

```bash
npm install
npm run dev
```

Open the Vite URL (usually `http://localhost:5173`).

If install fails with `edgesOut`, run `npm install --legacy-peer-deps`.

## Build / preview

```bash
npm run build
npm run preview
```

## Deploy

```bash
npm run build
npx vercel --yes
# or: npx netlify deploy --prod --dir=dist
```

See `DELIVERY.md` for scope, verification, and trade-offs.
