import { describe, it, expect } from 'vitest';
import { transliterate } from '../src/engine';

describe('Sinhalish Transliteration Engine', () => {
  describe('standalone vowels', () => {
    // Single 'a' = short inherent vowel (no modifier). 'aa' = long ā modifier.
    it("amma → අම්ම (single 'a' = inherent, no ā modifier)", () => {
      expect(transliterate('amma')).toBe('අම්ම');
    });

    it("ammaa → අම්මා ('aa' = long ā modifier)", () => {
      expect(transliterate('ammaa')).toBe('අම්මා');
    });

    it('acharya → අචර්‍ය', () => {
      expect(transliterate('acharya')).toBe('අචර්‍ය');
    });
  });

  describe('baseline text with spaces', () => {
    it('mama → මම', () => {
      expect(transliterate('mama')).toBe('මම');
    });

    it('gamata → ගමට', () => {
      expect(transliterate('gamata')).toBe('ගමට');
    });

    it("yanawa → යනව (single 'a' = inherent throughout)", () => {
      expect(transliterate('yanawa')).toBe('යනව');
    });

    it('yanawaa → යනවා', () => {
      expect(transliterate('yanawaa')).toBe('යනවා');
    });

    it('mama gamata yanawa → මම ගමට යනව', () => {
      expect(transliterate('mama gamata yanawa')).toBe('මම ගමට යනව');
    });

    it('keels paan → කීල්ස් පාන්', () => {
      expect(transliterate('keels paan')).toBe('කීල්ස් පාන්');
    });
  });

  describe('Sanyaka and Mishra consonants', () => {
    it('GNanaya → ඥනය (GN = jnya, uppercase required)', () => {
      expect(transliterate('GNanaya')).toBe('ඥනය');
    });
  });

  describe('amba bayanna — B vs b', () => {
    // 'b' (lowercase) = ordinary බ; 'B' (uppercase) = amba ඹ
    it("amba → අම්බ (phonetic: a + m(hal) + ba)", () => {
      expect(transliterate('amba')).toBe('අම්බ');
    });

    it("aBa → අඹ (B = amba consonant ඹ)", () => {
      expect(transliterate('aBa')).toBe('අඹ');
    });

    it("aBaa → අඹා (amba + long ā)", () => {
      expect(transliterate('aBaa')).toBe('අඹා');
    });
  });

  describe('case-sensitive vowels — A / Aa', () => {
    it('kAma → කැම (A = short ae modifier ැ)', () => {
      expect(transliterate('kAma')).toBe('කැම');
    });

    it('kAama → කෑම (Aa = long ae modifier ෑ)', () => {
      expect(transliterate('kAama')).toBe('කෑම');
    });
  });

  describe('Rakaransaya conjunct structures (ZWJ binding)', () => {
    it('shri → ශ්‍රී', () => {
      expect(transliterate('shri')).toBe('ශ්‍රී');
    });

    it('Shri → ෂ්‍රී (Sh = murdhaja ෂ)', () => {
      expect(transliterate('Shri')).toBe('ෂ්‍රී');
    });

    it('krama → ක්‍රම', () => {
      expect(transliterate('krama')).toBe('ක්‍රම');
    });
  });

  describe('Yansaya conjunct structures', () => {
    it('sathya → සත්‍ය', () => {
      expect(transliterate('sathya')).toBe('සත්‍ය');
    });
  });

  describe('backslash sequences', () => {
    it('\\n → ං (Anusvaraya)', () => {
      expect(transliterate('\\n')).toBe('ං');
    });

    it('\\h → ඃ (Visargaya)', () => {
      expect(transliterate('\\h')).toBe('ඃ');
    });

    it('\\N → ඞ (Kantaja Nayanna)', () => {
      expect(transliterate('\\N')).toBe('ඞ');
    });

    it('\\R → ඍ (Iruyanna)', () => {
      expect(transliterate('\\R')).toBe('ඍ');
    });

    it('sitha\\n → සීතං (backslash mid-word; i = long ī)', () => {
      expect(transliterate('sitha\\n')).toBe('සීතං');
    });
  });

  describe('pass-through characters', () => {
    it('numbers, punctuation, and non-latin pass unchanged', () => {
      expect(transliterate('ow! 123.')).toBe('ඔව්! 123.');
    });

    it('empty string returns empty string', () => {
      expect(transliterate('')).toBe('');
    });

    it('pure non-latin string passes unchanged', () => {
      expect(transliterate('123 .!?')).toBe('123 .!?');
    });
  });

  describe('case insensitivity for base consonants', () => {
    it('Mama → මම (uppercase M falls back to ම)', () => {
      expect(transliterate('Mama')).toBe('මම');
    });
  });

  describe('aa = long ā modifier', () => {
    it('kaama → කාම', () => {
      expect(transliterate('kaama')).toBe('කාම');
    });

    it('piima → පීම (ii = long ī)', () => {
      expect(transliterate('piima')).toBe('පීම');
    });
  });
});
