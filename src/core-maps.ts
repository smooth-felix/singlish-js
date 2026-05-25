export const UNICODE_TOKENS = {
  HAL_MARK: "්",
  ZWJ: "‍",
} as const;

// Backslash-prefixed standalone glyphs: \n \h \N \R
export const BACKSLASH_SEQUENCES: Record<string, string> = {
  n: "ං",
  h: "ඃ",
  N: "ඞ",
  R: "ඍ",
};

// ── COMPLEX CONSONANTS ────────────────────────────────────────────────────────
// Greedy 4-char → 3-char check (before BASE / SPECIAL consonants).
// Keys do NOT include a trailing vowel letter — the vowel is resolved by Phase 3.
// All keys are lowercase; input slice is lowercased before lookup.
export const COMPLEX_CONSONANTS: Record<string, string> = {
  // 4-char
  nndh: "ඳ",
  // 3-char
  nnd: "ඬ",
  nng: "ඟ",
};

// ── SPECIAL CONSONANTS ────────────────────────────────────────────────────────
// Case-sensitive entries checked at the 2-char then 1-char slot, BEFORE BASE.
// Input slice is used AS-IS (original case) for these lookups.
export const SPECIAL_CONSONANTS: Record<string, string> = {
  // 2-char all-caps or mixed-case — order matters: longest unambiguous first
  GN: "ඥ",
  KN: "ඤ",
  Sh: "ෂ",
  Ch: "ඡ",
  Th: "ථ",
  Dh: "ධ",
  // 1-char uppercase
  B: "ඹ",
  N: "ණ",
  L: "ළ",
  K: "ඛ",
  G: "ඝ",
  T: "ඨ",
  D: "ඪ",
  P: "ඵ",
};

// ── BASE CONSONANTS ───────────────────────────────────────────────────────────
// Lowercase keys; engine tries original-case slice first then lowercased.
export const BASE_CONSONANTS: Record<string, string> = {
  // 2-char keys (checked before 1-char)
  sh: "ශ",
  ch: "ච",
  th: "ත",
  dh: "ද",
  kh: "ඛ",
  gh: "ඝ",
  ph: "ඵ",
  bh: "භ",
  // 1-char keys
  k: "ක",
  g: "ග",
  j: "ජ",
  q: "ඣ",
  t: "ට",
  d: "ඩ",
  n: "න",
  p: "ප",
  b: "බ",
  m: "ම",
  y: "ය",
  r: "ර",
  l: "ල",
  v: "ව",
  w: "ව",
  s: "ස",
  h: "හ",
  f: "ෆ",
};

// ── INDEPENDENT VOWELS ────────────────────────────────────────────────────────
// Word-initial or standalone vowels (no preceding consonant context).
// lookupVowel tries original case first then lowercase — 'A'/'Aa' are case-sensitive.
export const INDEPENDENT_VOWELS: Record<string, string> = {
  // Case-sensitive mixed-case (uppercase A = ae short; Aa = ae long)
  Aa: "ඈ",
  A: "ඇ",
  // 2-char lowercase
  aa: "ආ",
  ae: "ඈ",
  ai: "ඓ",
  ii: "ඊ",
  ie: "ඊ",
  ee: "ඊ",
  ea: "ඒ",
  ei: "ඒ",
  uu: "ඌ",
  oo: "ඌ",
  oe: "ඕ",
  au: "ඖ",
  // 1-char lowercase
  a: "අ",
  i: "ඉ",
  u: "උ",
  e: "එ",
  o: "ඔ",
};

// ── DEPENDENT MODIFIERS (Pili) ────────────────────────────────────────────────
// Vowel signs attached directly to consonants.
// lookupVowel tries original case first then lowercase.
export const DEPENDENT_MODIFIERS: Record<string, string> = {
  // Case-sensitive (uppercase A = short ae pilla; Aa = long ae pilla)
  Aa: "ෑ",
  A: "ැ",
  // 2-char lowercase
  aa: "ා",
  ae: "ෑ",
  ai: "ෛ",
  ii: "ී",
  ie: "ී",
  ee: "ී",
  ea: "ේ",
  ei: "ේ",
  uu: "ූ",
  oo: "ූ",
  oe: "ෝ",
  au: "ෞ",
  // 1-char lowercase
  i: "ි",
  u: "ු",
  e: "ෙ",
  o: "ො",
};
