# Do you really need it?

A small React app that translates a purchase price into working time. The goal is to make spending decisions feel more concrete by showing the hours, days, or weeks of life traded for a purchase.

All calculations happen in the browser. The app does not track, store, or send user data.

## Features

- Purchase-to-time calculator
- Hourly, daily, monthly, and yearly income modes
- Dynamic result messages and reflection prompts
- Local and private calculation
- Pages for history and reflections
- Component and business-logic tests with Vitest
- Responsive and accessible UI

## Tech Stack

- React 19
- TypeScript
- Vite
- Tailwind CSS
- React Router
- Vitest
- React Testing Library

## Project Structure

```text
src/components   UI components
src/contexts     Calculator state provider
src/utils        Business logic and reusable helpers
src/pages        Route pages
src/test         Test setup
```

## Scripts

```bash
npm run dev
npm run build
npm run test -- --run
npm run test:coverage -- --maxWorkers=1
npm run lint
```

## Development

```bash
npm install
npm run dev
```

## Testing

The test suite covers components and extracted business logic.

```bash
npm run test -- --run
```

Coverage:

```bash
npm run test:coverage -- --maxWorkers=1
```

`--maxWorkers=1` avoids occasional temporary coverage directory races on Windows.

## Build

```bash
npm run build
```
