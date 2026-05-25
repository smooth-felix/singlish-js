# singlish-js — React demo

A standalone Vite + React app demonstrating [@felix-tech/singlish-js](https://www.npmjs.com/package/@felix-tech/singlish-js).

## Run locally

```bash
cd examples/react-demo
npm install
npm run dev
```

Then open `http://localhost:5173`.

## What's inside

| Demo | Description |
|------|-------------|
| **Live input** | Type Singlish, Sinhala renders on every keystroke |
| **Editor** | Side-by-side Singlish / Unicode split view with copy button |
| **Phrase table** | 20 common phrases converted at render time — no network calls |

## How the library is used

```ts
import { transliterate } from '@felix-tech/singlish-js';

transliterate('mama gamata yanawa'); // → "මම ගමට යනව"
```

`transliterate` is a pure function — call it directly in your render, no `useEffect` or memoisation needed.
