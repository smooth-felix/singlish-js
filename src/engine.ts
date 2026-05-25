import {
  UNICODE_TOKENS,
  BACKSLASH_SEQUENCES,
  COMPLEX_CONSONANTS,
  SPECIAL_CONSONANTS,
  BASE_CONSONANTS,
  INDEPENDENT_VOWELS,
  DEPENDENT_MODIFIERS,
} from './core-maps';

const CONJUNCT_PREFIX = UNICODE_TOKENS.HAL_MARK + UNICODE_TOKENS.ZWJ;

// Try original case first (handles uppercase specials and A/Aa vowels),
// then fall back to lowercase for base consonants and common vowels.
function lookup(map: Record<string, string>, slice: string): string | undefined {
  return map[slice] ?? map[slice.toLowerCase()];
}

function isLatin(char: string): boolean {
  const code = char.charCodeAt(0);
  return (code >= 65 && code <= 90) || (code >= 97 && code <= 122);
}

export function transliterate(input: string): string {
  let output = '';
  let cursor = 0;
  const len = input.length;

  while (cursor < len) {
    // Phase 1 — backslash sequences and non-Latin pass-through
    const char = input[cursor];
    if (char === '\\') {
      const nextChar = input[cursor + 1];
      const glyph = nextChar !== undefined ? BACKSLASH_SEQUENCES[nextChar] : undefined;
      if (glyph) {
        output += glyph;
        cursor += 2;
      } else {
        output += char;
        cursor++;
      }
      continue;
    }
    if (!isLatin(char)) {
      output += char;
      cursor++;
      continue;
    }

    // Phase 2 — greedy consonant match (4 → 3 → 2 → 1 chars)
    // Priority: COMPLEX_CONSONANTS → SPECIAL_CONSONANTS → BASE_CONSONANTS
    let activeConsonant = '';
    let matchSize = 0;

    const found4 = lookup(COMPLEX_CONSONANTS, input.substring(cursor, cursor + 4));
    if (found4) {
      activeConsonant = found4;
      matchSize = 4;
    } else {
      const found3 = lookup(COMPLEX_CONSONANTS, input.substring(cursor, cursor + 3));
      if (found3) {
        activeConsonant = found3;
        matchSize = 3;
      }
    }

    if (!activeConsonant) {
      const slice2 = input.substring(cursor, cursor + 2);
      const found2 = lookup(SPECIAL_CONSONANTS, slice2) ?? lookup(BASE_CONSONANTS, slice2);
      if (found2) {
        activeConsonant = found2;
        matchSize = 2;
      } else {
        const slice1 = input.substring(cursor, cursor + 1);
        const found1 = lookup(SPECIAL_CONSONANTS, slice1) ?? lookup(BASE_CONSONANTS, slice1);
        if (found1) {
          activeConsonant = found1;
          matchSize = 1;
        }
      }
    }

    if (matchSize > 0) cursor += matchSize;

    // Phase 3 — conjunct + dependent vowel resolution
    if (activeConsonant) {
      let conjunctSuffix = '';

      // Rakaransaya (lowercase r) or Yansaya (uppercase Y only)
      const lookahead = input[cursor];
      if (
        (lookahead === 'r' || lookahead === 'Y') &&
        cursor + 1 < len &&
        isLatin(input[cursor + 1])
      ) {
        const targetGlyph = lookahead === 'r' ? BASE_CONSONANTS['r'] : BASE_CONSONANTS['y'];
        conjunctSuffix = CONJUNCT_PREFIX + targetGlyph;
        cursor++;
      }

      const mod2 = lookup(DEPENDENT_MODIFIERS, input.substring(cursor, cursor + 2));
      const mod1 = lookup(DEPENDENT_MODIFIERS, input.substring(cursor, cursor + 1));

      if (mod2) {
        output += activeConsonant + conjunctSuffix + mod2;
        cursor += 2;
      } else if (mod1) {
        output += activeConsonant + conjunctSuffix + mod1;
        cursor += 1;
      } else if (input[cursor] === 'a') {
        // Inherent 'a' — bare consonant, no modifier
        output += activeConsonant + conjunctSuffix;
        cursor += 1;
      } else {
        // No following vowel — append al-lakuna (terminal consonant)
        output += activeConsonant + conjunctSuffix + UNICODE_TOKENS.HAL_MARK;
      }
      continue;
    }

    // Phase 4 — standalone independent vowel (2 chars → 1 char)
    const ind2 = lookup(INDEPENDENT_VOWELS, input.substring(cursor, cursor + 2));
    if (ind2) {
      output += ind2;
      cursor += 2;
      continue;
    }
    const ind1 = lookup(INDEPENDENT_VOWELS, input.substring(cursor, cursor + 1));
    if (ind1) {
      output += ind1;
      cursor += 1;
      continue;
    }

    // Safety fallback — emit raw character
    output += input[cursor++];
  }

  return output;
}
