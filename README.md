# @felix-tech/singlish-js

Zero-dependency TypeScript library that converts romanised Sinhala (Singlish) to Sinhala Unicode. Ships as dual **CJS + ESM** with full TypeScript declarations. **< 1 KB gzipped.**

---

## Installation

```bash
npm install @felix-tech/singlish-js
# or
pnpm add @felix-tech/singlish-js
# or
yarn add @felix-tech/singlish-js
```

---

## Quick start

```ts
import { transliterate } from '@felix-tech/singlish-js';

transliterate('mama');           // → "මම"
transliterate('mama gamata yanawa'); // → "මම ගමට යනව"
transliterate('keels paan');     // → "කීල්ස් පාන්"
transliterate('shrii');          // → "ශ්‍රී"
transliterate('sathYa');         // → "සත්‍ය"
```

---

## API

### `transliterate(input: string): string`

Converts a Singlish string to Sinhala Unicode. Non-Latin characters (digits, punctuation, spaces) pass through unchanged. The function never throws.

```ts
transliterate('mama gamata yanawa 123!'); // → "මම ගමට යනව 123!"
transliterate('');                        // → ""
```

---

## Transliteration reference

### The golden rule — inherent vowel

Single `a` after a consonant is the **inherent vowel** — it produces a bare consonant with no modifier. To write the long ā (ා) you must type `aa`.

```
ma   → ම   (bare — inherent a)
maa  → මා  (long ā modifier)
mama → මම
```

### Vowels

#### Independent (word-initial / standalone)

| Input | Sinhala | Name |
|-------|---------|------|
| `a`   | අ | short a |
| `aa`  | ආ | long ā |
| `A`   | ඇ | short ae *(uppercase A)* |
| `Aa`  | ඈ | long ae *(uppercase Aa)* |
| `ae`  | ඈ | long ae (alias) |
| `i`   | ඉ | short i |
| `ii` / `ie` / `ee` | ඊ | long ī |
| `u`   | උ | short u |
| `uu` / `oo` | ඌ | long ū |
| `e`   | එ | short e |
| `ea` / `ei` | ඒ | long ē |
| `o`   | ඔ | short o |
| `oe`  | ඕ | long ō |
| `ai`  | ඓ | ai |
| `au`  | ඖ | au |

#### Dependent modifiers (after a consonant)

Same input triggers the corresponding pilla instead of an independent vowel.

```
ka  → ක    (inherent a)
kaa → කා   (ā modifier / aela pilla)
kA  → කැ   (short ae / ketti aeda pilla)
kAa → කෑ   (long ae / diga aeda pilla)
ki  → කි   (short i / short ispilla)
kii → කී   (long ī / diga ispilla)
ku  → කු   (short u / papilla)
ke  → කෙ   (short e / kombuva)
ko  → කො   (short o)
koe → කෝ   (long ō)
kea → කේ   (long ē)
```

### Base consonants

| Input | Sinhala | | Input | Sinhala | |
|-------|---------|-|-------|---------|-|
| `k`   | ක | ka | `n` | න | na (dental) |
| `g`   | ග | ga | `p` | ප | pa |
| `j`   | ජ | ja | `b` | බ | ba |
| `t`   | ට | ṭa (retroflex) | `m` | ම | ma |
| `d`   | ඩ | ḍa (retroflex) | `y` | ය | ya |
| `sh`  | ශ | śa (tāluja) | `r` | ර | ra |
| `ch`  | ච | ca | `l` | ල | la (dental) |
| `th`  | ත | ta (dental) | `v` / `w` | ව | va |
| `dh`  | ද | da (dental) | `s` | ස | sa |
| `h`   | හ | ha | `f` | ෆ | fa |
| `kh`  | ඛ | kha | `bh` | භ | bha |
| `gh`  | ඝ | gha | `ph` | ඵ | pha |
| `q`   | ඣ | jha | | | |

### Special / aspirated consonants *(case-sensitive)*

Uppercase letters invoke the aspirated or special form.

| Input | Sinhala | vs lowercase |
|-------|---------|--------------|
| `Sh`  | ෂ | `sh` → ශ |
| `Ch`  | ඡ | `ch` → ච |
| `Th`  | ථ | `th` → ත |
| `Dh`  | ධ | `dh` → ද |
| `K`   | ඛ | `k` → ක |
| `G`   | ඝ | `g` → ග |
| `T`   | ඨ | `t` → ට |
| `D`   | ඪ | `d` → ඩ |
| `P`   | ඵ | `p` → ප |
| `B`   | ඹ | `b` → බ |
| `N`   | ණ | `n` → න |
| `L`   | ළ | `l` → ල |
| `GN`  | ඥ | jña |
| `KN`  | ඤ | ña (tāluja) |

```ts
transliterate('Shri');    // → "ෂ්‍රී"  (murdhaja Sh)
transliterate('shri');    // → "ශ්‍රී"  (taaluja sh)
transliterate('aBa');     // → "අඹ"   (B = amba ඹ)
transliterate('amba');    // → "අම්බ" (phonetic: a + m + ba)
```

### Sanyaka (prenasalised) consonants

| Input  | Sinhala | |
|--------|---------|-|
| `nng`  | ඟ | kaṇṭaja sanyaka ga |
| `nnd`  | ඬ | mūrdhaja sanyaka da |
| `nndh` | ඳ | dantaja sanyaka da |

### Conjunct consonants

Conjuncts use two distinct triggers:

- **Rakaransaya** — lowercase `r` after a consonant: `krama`, `shrii`
- **Yansaya** — **uppercase `Y`** after a consonant: `sathYa`, `aachaarYa`

Lowercase `y` is always plain ය — no conjunct binding.

| Input    | Sinhala | Structure |
|----------|---------|-----------|
| `krama`  | ක්‍රම | Rakaransaya (ra-conjunct) |
| `shrii`  | ශ්‍රී | Rakaransaya |
| `sathYa` | සත්‍ය | Yansaya (ya-conjunct) |
| `aachaarYa` | ආචාර්‍ය | Yansaya |
| `sathya` | සත්ය  | separate ත් + ය (no conjunct) |

### Standalone glyphs via backslash sequences

| Input | Sinhala | Name |
|-------|---------|------|
| `\n`  | ං | Anusvaraya (anusvāra / bindu) |
| `\h`  | ඃ | Visargaya |
| `\N`  | ඞ | Kaṇṭaja Nāyanna (NNGA) |
| `\R`  | ඍ | Iruyanna (vocalic R) |

```ts
transliterate('sitha\\n');  // → "සීතං"
```

---

## Unicode output

All output codepoints are in the **Sinhala Unicode block (U+0D80–U+0DFF)**, with the exception of **U+200D** (Zero Width Joiner) used to form conjunct ligatures.

---

## TypeScript

The package ships `.d.ts` declarations. No `@types/` package needed.

```ts
import type { transliterate } from '@felix-tech/singlish-js'; // fully typed
```

---

## Use cases

- **Live input fields** — wire `transliterate` to an `oninput` handler to render Sinhala as the user types romanised text.
- **IME / keyboard apps** — use as the core conversion engine behind a mobile or browser-based Sinhala input method.
- **Content pipelines** — bulk-convert legacy romanised Sinhala datasets to proper Unicode.
- **CLI tooling** — generate Sinhala strings in i18n files or database seeds without a system IME.
- **Search preprocessing** — expand romanised queries to Unicode before querying Sinhala document indices.

---

## License

MIT
