# Full Stack Developer (with automated testing) Technical Assessment

Thank you for taking the time to review this technical assessment.

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
- Use an infinite scroll to gradually load more inscriptions.

Note: The app, developed using Tailwind CSS, uses the closest available colors and dimensions matching the designs.

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

A description of the tests can be found in [Test Suite Description](https://docs.google.com/document/d/1ltg2GOkZKQCe_7uEJ8Zg73ro6oKRZAzS7-z6Mv6cQJw/edit?usp=sharing).
