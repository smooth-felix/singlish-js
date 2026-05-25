import {
  UNICODE_TOKENS,
  BACKSLASH_SEQUENCES,
  COMPLEX_CONSONANTS,
  SPECIAL_CONSONANTS,
  BASE_CONSONANTS,
  INDEPENDENT_VOWELS,
  DEPENDENT_MODIFIERS,
} from './core-maps';

// Consonant lookup: try original case first (for uppercase specials like 'B', 'N'),
// then fall back to lowercase (for common consonants like 'k', 'sh').
function lookupConsonant(
  map: Record<string, string>,
  slice: string,
): string | undefined {
  return map[slice] ?? map[slice.toLowerCase()];
}

// Vowel lookup: try original case first (for uppercase A/Aa), then lowercase.
function lookupVowel(
  map: Record<string, string>,
  slice: string,
): string | undefined {
  return map[slice] ?? map[slice.toLowerCase()];
}

export function transliterate(inputStream: string): string {
  let outputBuffer = '';
  let cursor = 0;
  // Keep original case — case-sensitive consonant maps need it.
  const input = inputStream;
  const len = input.length;

  while (cursor < len) {
    // Phase 1 — backslash sequences and non-Latin pass-through
    const rawChar = input[cursor];
    if (rawChar === '\\') {
      const nextChar = input[cursor + 1];
      const glyph = nextChar !== undefined ? BACKSLASH_SEQUENCES[nextChar] : undefined;
      if (glyph) {
        outputBuffer += glyph;
        cursor += 2;
      } else {
        outputBuffer += rawChar;
        cursor++;
      }
      continue;
    }
    if (!/[a-zA-Z]/.test(rawChar)) {
      outputBuffer += rawChar;
      cursor++;
      continue;
    }

    // Phase 2 — greedy consonant match (4 → 3 → 2 → 1 chars)
    // Priority: COMPLEX_CONSONANTS → SPECIAL_CONSONANTS → BASE_CONSONANTS
    let activeConsonant = '';
    let matchSize = 0;

    // Try 4-char then 3-char complex consonants (always lowercase keys)
    for (let size = 4; size >= 3; size--) {
      const slice = input.substring(cursor, cursor + size);
      const found = lookupConsonant(COMPLEX_CONSONANTS, slice);
      if (found) {
        activeConsonant = found;
        matchSize = size;
        break;
      }
    }

    if (!activeConsonant) {
      // Try 2-char: SPECIAL first, then BASE
      const slice2 = input.substring(cursor, cursor + 2);
      const found2 =
        lookupConsonant(SPECIAL_CONSONANTS, slice2) ??
        lookupConsonant(BASE_CONSONANTS, slice2);

      if (found2) {
        activeConsonant = found2;
        matchSize = 2;
      } else {
        // Try 1-char: SPECIAL first, then BASE
        const slice1 = input.substring(cursor, cursor + 1);
        const found1 =
          lookupConsonant(SPECIAL_CONSONANTS, slice1) ??
          lookupConsonant(BASE_CONSONANTS, slice1);

        if (found1) {
          activeConsonant = found1;
          matchSize = 1;
        }
      }
    }

    if (matchSize > 0) {
      cursor += matchSize;
    }

    // Phase 3 — conjunct + dependent vowel resolution
    if (activeConsonant) {
      let conjunctSuffix = '';

      // Lookahead: Rakaransaya (lowercase r) or Yansaya (uppercase Y only)
      const lookahead1 = input.substring(cursor, cursor + 1);
      if (
        (lookahead1 === 'r' || lookahead1 === 'Y') &&
        cursor + 1 < len &&
        /[a-zA-Z]/.test(input[cursor + 1])
      ) {
        const targetGlyph =
          lookahead1 === 'r' ? BASE_CONSONANTS['r'] : BASE_CONSONANTS['y'];
        conjunctSuffix = `${UNICODE_TOKENS.HAL_MARK}${UNICODE_TOKENS.ZWJ}${targetGlyph}`;
        cursor++;
      }

      const vowelSlice2 = input.substring(cursor, cursor + 2);
      const vowelSlice1 = input.substring(cursor, cursor + 1);

      const mod2 = lookupVowel(DEPENDENT_MODIFIERS, vowelSlice2);
      const mod1 = lookupVowel(DEPENDENT_MODIFIERS, vowelSlice1);

      if (mod2) {
        outputBuffer += activeConsonant + conjunctSuffix + mod2;
        cursor += 2;
      } else if (mod1) {
        outputBuffer += activeConsonant + conjunctSuffix + mod1;
        cursor += 1;
      } else if (vowelSlice1.toLowerCase() === 'a') {
        // Inherent 'a' — bare consonant, no modifier
        outputBuffer += activeConsonant + conjunctSuffix;
        cursor += 1;
      } else {
        // No following vowel — append al-lakuna (terminal consonant)
        outputBuffer += activeConsonant + conjunctSuffix + UNICODE_TOKENS.HAL_MARK;
      }
      continue;
    }

    // Phase 4 — standalone independent vowel (2 chars → 1 char)
    const indSlice2 = input.substring(cursor, cursor + 2);
    const indSlice1 = input.substring(cursor, cursor + 1);

    const ind2 = lookupVowel(INDEPENDENT_VOWELS, indSlice2);
    const ind1 = lookupVowel(INDEPENDENT_VOWELS, indSlice1);

    if (ind2) {
      outputBuffer += ind2;
      cursor += 2;
    } else if (ind1) {
      outputBuffer += ind1;
      cursor += 1;
    } else {
      // Safety fallback — emit raw character
      outputBuffer += input[cursor];
      cursor++;
    }
  }

  return outputBuffer;
}
