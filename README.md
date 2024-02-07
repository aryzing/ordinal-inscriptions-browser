# Ordinal Inscriptions Browser

To start the app, run

```bash
npm i
npm run dev
```

The app allows users to,

- Provide a Bitcoin address to search for inscriptions
- View a list of inscriptions owned by the address
- View an inscription's details
- Preview text and image inscriptions, with default fallback for other types

## Tests

Install Playwright's browsers & deps with,

```bash
npx playwright install
npx playwright install-deps
```

Run the tests with,

```bash
npx playwright test
```
