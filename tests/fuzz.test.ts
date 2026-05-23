import { describe, it, expect } from 'vitest';
import { transliterate } from '../src/engine';

// Characters that must pass through unchanged per FR5
const NON_LATIN_SAMPLES = ['1', '2', ' ', '.', '!', '?', ',', '-', '0'];

describe('Fuzz / property tests', () => {
  it('never throws on arbitrary ASCII input', () => {
    const chars = 'abcdefghijklmnopqrstuvwxyz0123456789 .,!?-_@#';
    for (let i = 0; i < chars.length; i++) {
      for (let j = i; j <= chars.length; j++) {
        expect(() => transliterate(chars.slice(i, j))).not.toThrow();
      }
    }
  });

  it('non-latin characters are always preserved in output', () => {
    for (const ch of NON_LATIN_SAMPLES) {
      const result = transliterate(ch);
      expect(result).toBe(ch);
    }
  });

  it('non-latin characters embedded in latin text pass through', () => {
    const result = transliterate('mama 123 gamata!');
    expect(result).toContain(' ');
    expect(result).toContain('123');
    expect(result).toContain('!');
  });

  it('output is always a string', () => {
    const inputs = ['', 'a', 'abc', '123', 'sh', 'krama', 'shri', '!@#'];
    for (const input of inputs) {
      expect(typeof transliterate(input)).toBe('string');
    }
  });

  it('is deterministic — same input always yields same output', () => {
    const inputs = ['mama', 'shri', 'krama', 'sathya', 'keels paan'];
    for (const input of inputs) {
      const first = transliterate(input);
      const second = transliterate(input);
      expect(first).toBe(second);
    }
  });

  it('unknown Latin letters (x, z) are emitted as-is (fallback)', () => {
    expect(transliterate('x')).toBe('x');
    expect(transliterate('z')).toBe('z');
  });
});
