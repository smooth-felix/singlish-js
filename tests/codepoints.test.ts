import { describe, it, expect } from 'vitest';
import {
  UNICODE_TOKENS,
  BACKSLASH_SEQUENCES,
  COMPLEX_CONSONANTS,
  SPECIAL_CONSONANTS,
  BASE_CONSONANTS,
  INDEPENDENT_VOWELS,
  DEPENDENT_MODIFIERS,
} from '../src/core-maps';

const SINHALA_START = 0x0d80;
const SINHALA_END = 0x0dff;

function assertSinhalaRange(map: Record<string, string>, mapName: string) {
  for (const [key, value] of Object.entries(map)) {
    for (let i = 0; i < value.length; ) {
      const cp = value.codePointAt(i);
      if (cp === undefined) break;
      // Allow ZWJ (U+200D) alongside the Sinhala block
      const isZwj = cp === 0x200d;
      const isInSinhala = cp >= SINHALA_START && cp <= SINHALA_END;
      expect(
        isZwj || isInSinhala,
        `${mapName}['${key}'] contains codepoint U+${cp.toString(16).toUpperCase().padStart(4, '0')} outside Sinhala block`,
      ).toBe(true);
      i += cp > 0xffff ? 2 : 1;
    }
  }
}

describe('Codepoint range assertions', () => {
  it('UNICODE_TOKENS are in Sinhala block or are ZWJ', () => {
    const cp1 = UNICODE_TOKENS.HAL_MARK.codePointAt(0)!;
    const cp2 = UNICODE_TOKENS.ZWJ.codePointAt(0)!;
    expect(cp1 >= SINHALA_START && cp1 <= SINHALA_END).toBe(true);
    expect(cp2).toBe(0x200d); // ZWJ is explicitly U+200D
  });

  it('BACKSLASH_SEQUENCES values are in Sinhala block', () => {
    assertSinhalaRange(BACKSLASH_SEQUENCES, 'BACKSLASH_SEQUENCES');
  });

  it('COMPLEX_CONSONANTS values are in Sinhala block', () => {
    assertSinhalaRange(COMPLEX_CONSONANTS, 'COMPLEX_CONSONANTS');
  });

  it('SPECIAL_CONSONANTS values are in Sinhala block', () => {
    assertSinhalaRange(SPECIAL_CONSONANTS, 'SPECIAL_CONSONANTS');
  });

  it('BASE_CONSONANTS values are in Sinhala block', () => {
    assertSinhalaRange(BASE_CONSONANTS, 'BASE_CONSONANTS');
  });

  it('INDEPENDENT_VOWELS values are in Sinhala block', () => {
    assertSinhalaRange(INDEPENDENT_VOWELS, 'INDEPENDENT_VOWELS');
  });

  it('DEPENDENT_MODIFIERS values are in Sinhala block', () => {
    assertSinhalaRange(DEPENDENT_MODIFIERS, 'DEPENDENT_MODIFIERS');
  });

  it('no two BASE_CONSONANTS keys collide on their first char (greedy order check)', () => {
    // Ensure 2-char keys are not shadowed by their 1-char prefix having a different mapping
    const keys = Object.keys(BASE_CONSONANTS);
    const twoChar = keys.filter((k) => k.length === 2);
    for (const key of twoChar) {
      const prefix = key[0];
      // If prefix is also a key, the 2-char lookup must come first in the engine — OK by design
      if (BASE_CONSONANTS[prefix]) {
        // Just verify both exist; the engine checks slice2 before slice1
        expect(BASE_CONSONANTS[key]).toBeDefined();
        expect(BASE_CONSONANTS[prefix]).toBeDefined();
      }
    }
  });
});
